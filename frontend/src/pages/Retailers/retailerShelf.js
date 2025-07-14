import { useState, useEffect, useRef } from "react";
import {
  Menu,
  Search,
  Filter,
  Plus,
  Minus,
  Mic,
  ShoppingCart,
  Grid3X3,
  List,
  Package,
  TrendingUp,
  AlertTriangle,
  Loader2,
  PlusCircle,
  X,
  Eye,
  ChevronDown,
  ChevronRight,
  Star,
  Building2,
  Tag,
  MicOff
} from "lucide-react";
import API from "../../api"; // Adjust the import path as needed
import { useAuth } from "../../components/AuthContext";
import RetailerCart from "./retailerCart";
import { useLocation } from "react-router-dom";

export default function Shelf() {
  // --- STATE ---
  const { user } = useAuth();
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [productData, setProductData] = useState([]);
  const [categoryStructure, setCategoryStructure] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(Object.keys(categoryStructure)[0]);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderQuantities, setOrderQuantities] = useState({});
  const [viewMode, setViewMode] = useState("categories"); // categories or distributors
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [inventoryArr, setInventoryArr] = useState([]); 
  const [selectedDistributors, setSelectedDistributors] = useState({});
  const [fade, setFade] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Distributor modal state
  const [showDistributorModal, setShowDistributorModal] = useState(false);
  const [distributorSearch, setDistributorSearch] = useState("");
  const [modalDistributor, setModalDistributor] = useState(null);

  // New state for new products
  const [newProducts, setNewProducts] = useState([]);
  const [selectedNewVariants, setSelectedNewVariants] = useState({});
  const [isAddingToInventory, setIsAddingToInventory] = useState(false);

  // State for inventory variants

  const [inventoryStockMap, setInventoryStockMap] = useState({});

  const recognitionRef = useRef(null);

  // --- PLACEHOLDER SCROLL DATA ---
const placeholders = [
  "Search products...",
  "Search distributors...",
  "Search variants...",
  "Search orders...",
  "Search categories...",
];

const [placeholderIndex, setPlaceholderIndex] = useState(0);
const [displayedPlaceholder, setDisplayedPlaceholder] = useState(placeholders[0]);

useEffect(() => {
  const interval = setInterval(() => {
    setFade(false); // start fade-out
    setTimeout(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      setFade(true); // fade-in after placeholder change
    }, 300); // delay sync with transition
  }, 1500);
  return () => clearInterval(interval);
}, []);

useEffect(() => {
  setDisplayedPlaceholder(placeholders[placeholderIndex]);
}, [placeholderIndex]);


  // --- FETCH PRODUCTS FROM BACKEND AND BUILD CATEGORY STRUCTURE ---
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Fetch products from connected distributors
        const response = await API.get('/products/connected-distributors');
        const products = response.data.products || [];
        setProductData(products);

        // Build category structure dynamically
        const structure = {};
        products.forEach(product => {
          const category = product.category || "Other";
          const subcategory = product.subcategory || "General";
          if (!structure[category]) structure[category] = {};
          if (!structure[category][subcategory]) structure[category][subcategory] = [];
          structure[category][subcategory].push(product.name);
        });
        setCategoryStructure(structure);

        // Set default active category and subcategory
        const firstCategory = Object.keys(structure)[0] || null;
        setActiveCategory(firstCategory);
        setActiveSubcategory(firstCategory ? Object.keys(structure[firstCategory])[0] : null);

      } catch (error) {
        setProductData([]);
        setCategoryStructure({});
      }
      setIsLoading(false);
    };
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  // --- ORDER QUANTITIES ---
  useEffect(() => {
    const initialQuantities = {};
    productData.forEach(product => {
      product.variants.forEach(variant => {
        initialQuantities[`${product.id}-${variant.id}`] = {
          quantity: 0,
          unit: "box"
        };
      });
    });
    setOrderQuantities(initialQuantities);
  }, [productData]);
  
     useEffect(() => {
    // Only run if inventoryArr or productData are loaded
    if (inventoryArr.length === 0 && productData.length === 0) return;
  
    const fetchCart = async () => {
      try {
        // 1. Fetch from backend
        const res = await API.get('/cart');
        let backendCart = Array.isArray(res.data) ? res.data : [];
              // 3. Enrich cart items with product/variant info
        const enrichedCart = backendCart.map(item => {

          // Find product in inventoryArr or productData
          const product =
            productData.find(p => String(p.id) === String(item.productId))
          if (!product) return item;
          console.log("Found product:", product);
          // Find variant by id or _id
          const variant =
            product.variants.find(
              v => String(v.id) === String(item.variantId) || String(v._id) === String(item.variantId)
            );
          if (!variant) return item;
  
          return {
            ...item,
            id: `${product.id}-${variant.id || variant._id}`,
            productName: product.name,
            productIcon: product.icon,
            variantName: variant.name || "",
            price: variant.sellingPrice || 0,
            totalPrice: (variant.sellingPrice || 0) * (item.quantity || 1),
            distributor: product.distributor || "Unknown Distributor",
            sku: variant.sku || "",
            distributorId: product.distributorId || item.distributorId,
            distributorName: product.distributor || "Unknown Distributor"
          };
        });
        console.log("Enriched cart items:", enrichedCart);
  
        setCartItems(enrichedCart);
      } catch (error) {
        setCartItems([]);
      }
      setProductsLoaded(true);
    };
  
    fetchCart();
    // eslint-disable-next-line
  }, [inventoryArr, productData]);
  
    useEffect(() => {
    if (productsLoaded) {
      API.post('/cart/save', { cartItems });
    }
  }, [cartItems, productsLoaded]);
  
  // --- UTILITY FUNCTIONS ---
  const updateUnit = (productId, variantId, unit) => {
    const key = `${productId}-${variantId}`;
    setOrderQuantities(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        unit
      }
    }));
  };

 const addToCart = (product) => {
  const newItems = product.variants.map(variant => {
    const key = `${product.id}-${variant.id}`;
    const quantity = orderQuantities[key]?.quantity || 0;
    if (quantity > 0) {
      return {
        id: key,
        productId: product.id,
        variantId: variant.id,
        productName: product.name,
        productIcon: product.icon,
        sku: variant.sku || "",
        variantName: variant.name,
        price: variant.sellingPrice,
        quantity,
        unit: orderQuantities[key]?.unit || "box",
        totalPrice: variant.sellingPrice * quantity,
        distributorId: product.distributorId,
        distributor: product.distributor || "Unknown Distributor",
        distributorName: product.distributor || "Unknown Distributor"
      };
    }
    return null;
  }).filter(Boolean);

  if (newItems.length === 0) {
    alert("Please select quantity for at least one variant");
    return;
  }

  setCartItems(prevCart => {
    const updatedCart = [...prevCart];

    newItems.forEach(newItem => {
      const existingIndex = updatedCart.findIndex(
        item => item.productId === newItem.productId && item.variantId === newItem.variantId
      );

      if (existingIndex !== -1) {
        const existingItem = updatedCart[existingIndex];
        const newQuantity = existingItem.quantity + newItem.quantity;
        updatedCart[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: newQuantity * existingItem.price,
        };
      } else {
        updatedCart.push(newItem);
      }
    });

    return updatedCart;
  });

  // Reset input quantities
  const resetQuantities = {};
  product.variants.forEach(variant => {
    const key = `${product.id}-${variant.id}`;
    resetQuantities[key] = {
      ...orderQuantities[key],
      quantity: 0
    };
  });

  setOrderQuantities(prev => ({
    ...prev,
    ...resetQuantities
  }));
};


  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0).toLocaleString();
  };

// First, add this helper function inside your component
const hasAnyQuantities = () => {
  return Object.values(orderQuantities).some(item => item.quantity > 0);
};

// Add this function to handle adding all items
const addAllToCart = () => {
  const itemsToAdd = [];

  currentProducts.forEach(product => {
    product.variants.forEach(variant => {
      const key = `${product.id}-${variant.id}`;
      const quantity = orderQuantities[key]?.quantity || 0;
      if (quantity > 0) {
        itemsToAdd.push({
          id: key,
          distributorId: product.distributorId,
          sku: variant.sku || "",
          productId: product.id,
          variantId: variant.id,
          productName: product.name,
          productIcon: product.icon,
          variantName: variant.name,
          price: variant.sellingPrice,
          quantity,
          unit: orderQuantities[key]?.unit || "box",
          totalPrice: variant.sellingPrice * quantity,
          distributor: product.distributor || "Unknown Distributor",
          distributorName: product.distributor || "Unknown Distributor"
        });
      }
    });
  });

  if (itemsToAdd.length === 0) {
    alert("Please select quantity for at least one item");
    return;
  }

  setCartItems(prevCart => {
    const updatedCart = [...prevCart];

    itemsToAdd.forEach(newItem => {
      const existingIndex = updatedCart.findIndex(
        item => item.productId === newItem.productId && item.variantId === newItem.variantId
      );

      if (existingIndex !== -1) {
        const existingItem = updatedCart[existingIndex];
        const newQuantity = existingItem.quantity + newItem.quantity;
        updatedCart[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: newQuantity * existingItem.price,
        };
      } else {
        updatedCart.push(newItem);
      }
    });

    return updatedCart;
  });

  // Reset all selected quantities
  const resetQuantities = {};
  Object.keys(orderQuantities).forEach(key => {
    resetQuantities[key] = { ...orderQuantities[key], quantity: 0 };
  });

  setOrderQuantities(prev => ({
    ...prev,
    ...resetQuantities
  }));
};


// Add this JSX right before the closing </div> of the main container
// (before the Cart Sidebar)
  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const selectedItems = getSelectedCartItems();
      // Group by distributor
      const distributorGroups = {};
      selectedItems.forEach(item => {
        const distributor = item.distributorId; // Only use the ID!
        if (!distributorGroups[distributor]) distributorGroups[distributor] = [];
        distributorGroups[distributor].push(item);
      });
      console.log("Placing order payload:", { distributorGroups });

      // Place an order for each distributor
      for (const [distributorId, items] of Object.entries(distributorGroups)) {
        await API.post('/orders/create', {
          distributorId,
          items: items.map(item => ({
            productId: item.productId,
            variantId: item.variantId,
            sku: item.sku,
            quantity: item.quantity,
            unit: item.unit
          }))
        });
      }

      setCartItems([]);
      setShowCart(false);
      alert('Order(s) placed successfully!');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- SEARCH ---
  const performGlobalSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowGlobalSearch(false);
      return;
    }
    const results = [];
    const queryLower = query.toLowerCase();
    productData.forEach(product => {
      if (product.name.toLowerCase().includes(queryLower)) {
        results.push({ ...product, matchType: 'product' });
      } else if (product.distributor.toLowerCase().includes(queryLower)) {
        results.push({ ...product, matchType: 'distributor' });
      } else {
        const matchingVariants = product.variants.filter(variant =>
          variant.name.toLowerCase().includes(queryLower)
        );
        if (matchingVariants.length > 0) {
          results.push({ ...product, matchType: 'variant', matchingVariants });
        }
      }
    });
    setSearchResults(results);
    setShowGlobalSearch(results.length > 0);
  };

  // --- VOICE SEARCH ---
  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        performGlobalSearch(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };
  const stopVoiceSearch = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  };

  const navigateToProduct = (product) => {
    console.log("Navigating to product:", product);
    setActiveCategory(product.category);
    setActiveSubcategory(product.subcategory);
    setShowGlobalSearch(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: text.replace(regex, (match) => `<mark class="bg-yellow-200 px-1 rounded">${match}</mark>`),
        }}
      />
    );
  };
  const getStockStatus = (variants) => {
    const totalStock = variants.reduce((sum, v) => sum + v.stock, 0);
    const hasOutOfStock = variants.some(v => v.stock === 0);
    const hasLowStock = variants.some(v => v.stock > 0 && v.stock <= 5);
    if (totalStock === 0) return { status: 'out', color: 'red', text: 'Out of Stock' };
    if (hasOutOfStock || hasLowStock) return { status: 'low', color: 'yellow', text: 'Low Stock' };
    return { status: 'good', color: 'green', text: 'In Stock' };
  };

  const getPriceRange = (variants) => {
    const prices = variants.map(v => v.sellingPrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹${min.toLocaleString()}` : `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
  };

  const updateQuantity = (productId, variantId, value) => {
    const key = `${productId}-${variantId}`;
    setOrderQuantities(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        quantity: Math.max(0, value)
      }
    }));
  };

  // --- CATEGORY/SUBCATEGORY LOGIC ---
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveSubcategory(null); // Reset subcategory when changing category
  };

  const handleSubcategoryClick = (subcategory) => {
    setActiveSubcategory(subcategory);
  };

  // --- PRODUCT FILTERING ---
  const getCurrentProducts = () => {
    let products;
    if (viewMode === "categories") {
      products = inventoryArr.filter(p =>
        p.category === activeCategory &&
        (!activeSubcategory || p.subcategory === activeSubcategory)
      );
    } else {
      // Group by distributors
      const distributorProducts = {};
      inventoryArr.forEach(product => {
        if (!distributorProducts[product.distributor]) {
          distributorProducts[product.distributor] = [];
        }
        distributorProducts[product.distributor].push(product);
      });
      products = distributorProducts[activeCategory] || [];
    }
    // Apply filters
    return products.filter(product => {
      if (filterType === "low-stock") {
        return product.variants.some(v => v.stock > 0 && v.stock <= 5);
      } else if (filterType === "out-of-stock") {
        return product.variants.some(v => v.stock === 0);
      }
      return true;
    }).sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'stock':
          aVal = a.variants.reduce((sum, v) => sum + v.stock, 0);
          bVal = b.variants.reduce((sum, v) => sum + v.stock, 0);
          break;
        case 'price':
          aVal = Math.min(...a.variants.map(v => v.sellingPrice));
          bVal = Math.min(...b.variants.map(v => v.sellingPrice));
          break;
        default:
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
      }
      if (sortOrder === 'desc') {
        return aVal < bVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });
  };

  const currentProducts = getCurrentProducts();

  // --- DISTRIBUTOR MODAL LOGIC ---
  const allDistributors = [...new Set(productData.map(p => p.distributorId).filter(Boolean))];
  const filteredDistributors = allDistributors.filter(d =>
    d.toLowerCase().includes(distributorSearch.toLowerCase())
  );

  // Fetch products for the selected distributor (from Products model)
  const [modalProducts, setModalProducts] = useState([]);
  const fetchDistributorProducts = async (distributorId) => {
    setIsLoading(true);
    try {
      const res = await API.get(`/products/get?distributorId=${distributorId}`);
      setModalProducts(res.data || []);
    } catch {
      setModalProducts([]);
    }
    setIsLoading(false);
  };

  // When modalDistributor changes, fetch products
  useEffect(() => {
    if (modalDistributor) fetchDistributorProducts(modalDistributor);
  }, [modalDistributor]);

  // Cache for distributor products
  const [distributorProductsCache, setDistributorProductsCache] = useState({});

  // Fetch products for the selected distributor (from Products model)
  useEffect(() => {
    if (!modalDistributor) return;

    // If already cached, use cache
    if (distributorProductsCache[modalDistributor]) {
      setModalProducts(distributorProductsCache[modalDistributor]);
      return;
    }
    // Otherwise, fetch and cache
    setIsLoading(true);
    API.get(`/products/get?distributorId=${modalDistributor}`)
      .then(res => {
        const products = res.data || [];
        setModalProducts(products);
        setDistributorProductsCache(prev => ({
          ...prev,
          [modalDistributor]: products
        }));
      })
      .catch(() => setModalProducts([]))
      .finally(() => setIsLoading(false));
  }, [modalDistributor]);

  const updateCartItemQuantity = (itemId, newQuantity) => {
  setCartItems(prev =>
    prev.map(item =>
      item.id === itemId
        ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity }
        : item
    )
  );
};

  // Fetch inventory variant IDs for quick lookup
  const fetchInventoryVariantIds = async () => {
    try {
      const res = await API.get('/inventory');
      const arr = Array.isArray(res.data) ? res.data : (res.data.inventory || []);
      setInventoryArr(arr);
      setProductData(arr);

      // Build category structure from inventoryArr
      const structure = {};
      arr.forEach(product => {
        const category = product.category || "Other";
        const subcategory = product.subcategory || "General";
        if (!structure[category]) structure[category] = {};
        if (!structure[category][subcategory]) structure[category][subcategory] = [];
        structure[category][subcategory].push(product.name);
      });
      setCategoryStructure(structure);

      // Set default active category and subcategory if not set
      const firstCategory = Object.keys(structure)[0] || null;
      setActiveCategory(firstCategory);
      setActiveSubcategory(firstCategory ? Object.keys(structure[firstCategory])[0] : null);

      // Build stock map
      const stockMap = {};
      arr.forEach(item => {
        item.variants.forEach(variant => {
          stockMap[variant._id] = variant.stock || 0;
        });
      });
      setInventoryStockMap(stockMap);
    } catch {
      setInventoryArr([]);
      setCategoryStructure({});
      setInventoryStockMap({});
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchInventoryVariantIds();
  }, []);

  const handleAddVariantToInventory = async (variantId) => {
    setIsAddingToInventory(true);
    try {
      await API.post("/inventory/add", { variantId });
      await fetchInventoryVariantIds(); // <-- ensure this is awaited
      alert("Variant added to your inventory!");
    } catch {
      alert("Failed to add variant to inventory.");
    }
    setIsAddingToInventory(false);
  };

  // Distributor information state
  const [distributorInfo, setDistributorInfo] = useState({}); // { distributorId: { companyName, ... } }

  useEffect(() => {
    if (productData.length === 0) return;
    const uniqueIds = [...new Set(productData.map(p => p.distributorId).filter(Boolean))];
    if (uniqueIds.length === 0) return;

    API.post('/distributors/batch', { ids: uniqueIds })
      .then(res => {
        const infoMap = {};
        (res.data.distributors || []).forEach(d => {
          infoMap[d._id] = d;
        });
        setDistributorInfo(infoMap);
      })
      .catch(() => setDistributorInfo({}));
  }, [productData]);

  // New function to group cart items by distributor
  const groupCartByDistributor = () => {
    const groups = {};
    cartItems.forEach(item => {
      const distributorId = item.distributorId;
      if (!distributorId) {
        console.warn('Cart item missing distributorId:', item);
        return;
      }
      if (!groups[distributorId]) groups[distributorId] = [];
      groups[distributorId].push(item);
    });
    return groups;
  };

  const getSelectedCartItems = () => {
    const groups = groupCartByDistributor();
    let selected = [];
    Object.entries(groups).forEach(([distributor, items]) => {
      if (selectedDistributors[distributor] !== false) {
        selected = selected.concat(items);
      }
    });
    return selected;
  };

  const location = useLocation();

  useEffect(() => {
    setShowDistributorModal(false);
    setModalDistributor(null);
  }, [location.pathname]);


  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
     <div className="top-0 md:pt-3 mt-0 z-50 bg-zinc-100 font-eudoxus border-b-0 backdrop-blur-md transition-all duration-500 ease-in-out">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4 pl-0 md:pl-16 ">
          
          {/* Left: Futuristic Title & Count */}
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-xl md:text-3xl font-bold tracking-tight pl-4 md:pl-4 ">
              <span className="text-gray-900 transition-colors duration-300 hover:text-gray-700">
                Your
              </span>
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 bg-clip-text text-transparent ml-2 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 transition-all duration-300">
                Inventory
              </span>
            </h2>
            <div className=" mt-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg hover:shadow-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 cursor-default">
              {currentProducts.length}
            </div>
          </div>

          {/* Center: Futuristic Search Bar */}
          <div className="flex-1 max-w-sm sm:max-w-md mx-4 mr-4 md:-ml-4">
            <div className="relative group">
              <input
                type="text"
                placeholder={displayedPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  performGlobalSearch(e.target.value);
                }}
                className="w-full pl-10 pr-12 py-2.5 sm:py-3 rounded-2xl border border-gray-200/50 bg-gradient-to-r from-gray-100/80 to-gray-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-400 focus:bg-white text-sm placeholder:text-gray-500 transition-all duration-300 shadow-lg backdrop-blur-lg hover:shadow-md hover:border-gray-300/60 group-hover:from-gray-100/80 group-hover:to-gray-200/50"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300 group-hover:scale-110">
                <Search className="w-2.5 h-2.5 text-white" />
              </div>
              
              {/* Voice Search Button */}
              <button
                onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-xl transition-all duration-300 ${
                  isListening
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-pulse hover:from-red-400 hover:to-pink-400'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 shadow-sm hover:shadow-md'
                } hover:scale-110`}
              >
                {isListening ? <MicOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Mic className="w-4 h-4 sm:w-4 sm:h-4" />}
              </button>

              {/* Global Search Results */}
              {showGlobalSearch && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-2xl z-50 max-h-64 overflow-y-auto animate-in fade-in-0 slide-in-from-top-2 duration-300">
                  {searchResults.map(product => (
                    <div
                      key={`search-${product.id}`}
                      onClick={() => navigateToProduct(product)}
                      className="p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 cursor-pointer border-b border-gray-100/50 last:border-b-0 transition-all duration-200 hover:shadow-sm group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                          {product.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate group-hover:text-gray-700 transition-colors duration-200">
                            {highlightText(product.name, searchQuery)}
                          </p>
                          <p className="text-sm text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-200">
                            {highlightText(product.distributor, searchQuery)} • {product.category} → {product.subcategory}
                          </p>
                          {product.matchType === 'variant' && (
                            <p className="text-xs text-cyan-600 font-medium mt-1 group-hover:text-cyan-500 transition-colors duration-200">
                              Variants: {product.matchingVariants.map(v => v.name).join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Futuristic Action Buttons */}
          <div className="flex items-center gap-2 pr-0 md:pr-14">
            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
             className="relative px-4 py-2 sm:px-5 sm:py-2.5 md:px-3 md:py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl group transform hover:scale-105 active:scale-95"

            >
              <ShoppingCart className=" w-5 h-5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg hover:shadow-xl hover:from-red-400 hover:to-pink-400 transition-all duration-300 animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Distributor Button */}
            <button
              onClick={() => {
                setShowDistributorModal(true);
                setDistributorSearch("");
                setModalDistributor(null);
              }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group transform hover:scale-105 active:scale-95"
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs sm:text-sm font-medium">
                <span className="hidden sm:inline">Distributor</span>
                <span className="sm:hidden">Distributor</span>
              </span>
            </button>
          </div>
        </div>
      </div>


      {/* Category Tabs Bar */}
      <div className="w-full bg-white pt-4 sm:pl-16 sm:pr-16">
       {/* Row: Desktop - "Shop for..." + Tabs + Filters */}
        <div className="hidden sm:flex items-center justify-between w-full px-4 pt-1">
          {/* Left: Shop for text + Tabs */}
          <div className="flex items-center gap-4">
            {/* Shop for... */}
            <div className="text-xl font-semibold text-gray-800">Shop for...</div>

            {/* Category Tabs (32px padding from left edge of this group) */}
            <div className="flex flex-wrap gap-2 overflow-x-auto">
              {Object.keys(categoryStructure).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveSubcategory(null);
                    setViewMode("categories");
                  }}
                  className={`relative h-[42px] px-5 py-1 text-sm sm:text-base font-semibold whitespace-nowrap rounded-full transition-all duration-300
                    ${
                      activeCategory === cat
                        ? "border-2 border-blue-600 text-gray-800 font-bold"
                        : "border-transparent text-gray-700 hover:border-gray-300 hover:text-black"
                    }`}
                  style={{ outline: "none" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Filter Buttons */}
          <div className="flex items-center gap-2 pb-1">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filterType === "all"
                  ? "bg-blue-700 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-sky-100"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilterType("low-stock")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filterType === "low-stock"
                  ? "bg-yellow-500 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-sky-100"
              }`}
            >
              Low Stock
            </button>
            <button
              onClick={() => setFilterType("out-of-stock")}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                filterType === "out-of-stock"
                  ? "bg-red-500 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-sky-100"
              }`}
            >
              Out of Stock
            </button>
          </div>
        </div>


        {/* Mobile: Tabs + Hamburger Filter */}
        <div className="sm:hidden flex items-center w-full overflow-x-auto scrollbar-hide px-4 space-x-2 mt-2">
          {/* Tabs */}
          <div className="flex flex-nowrap space-x-2">
            {Object.keys(categoryStructure).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveSubcategory(null);
                  setViewMode("categories");
                }}
                className={`relative h-[40px] px-5 py-1 text-sm font-semibold whitespace-nowrap border border-gray-300 rounded-full transition-all duration-300
                  ${
                    activeCategory === cat
                      ? "bg-blue-700 text-white shadow-inner"
                      : "bg-white text-gray-700 hover:bg-gray-100 hover:text-black"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Hamburger Filter Button */}
          <div className="flex-shrink-0">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-md hover:scale-105 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black/10 z-50 overflow-hidden">
                  <div className="divide-y divide-gray-100">
                    <button
                      onClick={() => {
                        setFilterType("all");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-sky-50"
                    >
                      All Items
                    </button>
                    <button
                      onClick={() => {
                        setFilterType("low-stock");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-yellow-50"
                    >
                      Low Stock
                    </button>
                    <button
                      onClick={() => {
                        setFilterType("out-of-stock");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-50"
                    >
                      Out of Stock
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Main Content: Subcategories + Products */}
      <div
        className="flex w-full px-0 sm:px-6 py-4 sm:py-8 gap-2 sm:gap-6 rounded-3xl md:pl-32 md:pr-16"
        style={{
          background: activeCategory ? "#FFFFFF" : undefined,
          transition: "background 0.3s"
        }}
      >
        {/* Subcategory Area */}
       <div
        className="flex-shrink-0 w-[100px] sm:w-[150px] md:w-[180px] lg:w-[220px] max-w-[220px] min-w-[100px] md:mt-0">

          <div className="bg-white rounded-sm shadow-sm p-4 top-[120px] mb-4">
            <div className="flex flex-col gap-2">
              {Object.keys(categoryStructure[activeCategory] || {}).map(subcat => (
            <button
              key={subcat}
              onClick={() => handleSubcategoryClick(subcat)}
              className={`font-eudoxus px-3 py-2 rounded-sm gap-2 transition-colors
                ${
                  activeSubcategory === subcat
                    ? "md:border-r-8 border-r-4 sm:border-r-2 border-blue-500 text-gray-800 shadow font-semibold"
                    : "bg-white text-blue-900 border-blue-100 hover:bg-blue-100 font-medium"
                }
                text-sm sm:text-base md:text-[0.6rem] lg:text-[1.05rem]
              `}
            >
              {subcat}
            </button>

              ))}
            </div>
          </div>
        </div>

        {/* Product Area */}
        <div className="flex-1 min-w-0 md:pr-16">
          <div className="bg-white rounded-3xl p-4 sticky top-[120px]">
            {currentProducts.length === 0 ? (
              <div className="bg-white rounded-xl  p-8 text-center text-gray-400 w-full">
                No products found for this category/subcategory.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentProducts.map(product => {
                  const stockInfo = getStockStatus(product.variants, product.id);
                  const isHovered = hoveredProduct === product.id;

                  return (
                    <div
                      key={product.id}
                      className="group bg-white to-gray-50 hover:shadow-xl transition-all duration-300  hover:border-blue-300 overflow-hidden cursor-pointer transform hover:scale-[1.02]"
                      onClick={() => setSelectedProduct(product)}
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Product Image/Icon Section */}
                      <div className="relative bg-white h-48 flex items-center justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          {product.icon}
                        </div>
                        
                        {/* Stock Status Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                            stockInfo.status === 'good' ? 'bg-green-100/80 text-green-800 border border-green-200' :
                            stockInfo.status === 'low' ? 'bg-yellow-100/80 text-yellow-800 border border-yellow-200' :
                            stockInfo.status === 'out' ? 'bg-red-100/80 text-red-800 border border-red-200' :
                            stockInfo.status === 'in-cart' ? 'bg-blue-100/80 text-blue-800 border border-blue-200' :
                            'bg-gray-100/80 text-gray-800 border border-gray-200'
                          }`}>
                            {stockInfo.text}
                          </span>
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      {/* Product Details Section */}
                      <div className="p-6 space-y-4">
                        {/* Product Name & Basic Info */}
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">
                              {product.distributor}
                            </span>
                            <span className="text-xs text-gray-500">
                              {product.variants.length} variants
                            </span>
                          </div>
                        </div>

                        {/* Price Range & Sales */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 font-medium">Price Range</p>
                            <p className="text-lg font-bold text-gray-900">
                              {getPriceRange(product.variants)}
                            </p>
                          </div>
                          <div className="text-right space-y-1">
                            <p className="text-xs text-gray-500 font-medium">Daily Sales</p>
                            <p className="text-sm font-semibold text-blue-600">
                              {product.dailyAvgSales}/day
                            </p>
                          </div>
                        </div>

                        {/* Cart Status Details */}
                        {stockInfo.status === 'in-cart' && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <p className="text-xs font-medium text-blue-800 mb-2">Items in Cart:</p>
                            <div className="space-y-0">
                              {stockInfo.cartItems.map(item => (
                                <div key={item.id} className="flex justify-between text-xs text-blue-700">
                                  <span className="truncate">{item.variantName}</span>
                                  <span className="font-medium">{item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quick Action Hint */}
                        <div className=" pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-center text-sm text-gray-500 bg-gray-50 rounded-lg">
                            <span className="mr-2">👆</span>
                            Click to view variants and order
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Product Modal */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl shadow-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden">
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                        {selectedProduct.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                        <p className="text-blue-100">{selectedProduct.distributor}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                  {/* Product Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Price Range</p>
                      <p className="text-xl font-bold text-gray-900">{getPriceRange(selectedProduct.variants)}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Daily Sales</p>
                      <p className="text-xl font-bold text-green-700">{selectedProduct.dailyAvgSales}/day</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Total Variants</p>
                      <p className="text-xl font-bold text-purple-700">{selectedProduct.variants.length}</p>
                    </div>
                  </div>

                  {/* Cart Status */}
                  {getStockStatus(selectedProduct.variants, selectedProduct.id).status === 'in-cart' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Items in Cart
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {getStockStatus(selectedProduct.variants, selectedProduct.id).cartItems.map(item => (
                          <div key={item.id} className="flex justify-between items-center bg-white rounded-lg p-2 border border-blue-200">
                            <span className="text-sm font-medium text-blue-900">{item.variantName}</span>
                            <span className="text-sm font-bold text-blue-700">Qty: {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Variants Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center mb-4">
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                      Product Variants
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {selectedProduct.variants.map(variant => {
                        const cartItem = cartItems.find(item => 
                          String(item.productId) === String(selectedProduct.id) && 
                          (String(item.variantId) === String(variant.id) || String(item.variantId) === String(variant._id))
                        );

                        return (
                          <div key={variant.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                            {/* Variant Header */}
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-bold text-gray-900">{variant.name}</h4>
                                <p className="text-sm text-gray-500">SKU: {variant.sku}</p>
                              </div>
                              <div className="text-right">
                                {cartItem ? (
                                  <span className="inline-flex px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium">
                                    In Cart: {cartItem.quantity}
                                  </span>
                                ) : (
                                  <span className={`inline-flex px-3 py-1 text-sm rounded-full font-medium ${
                                    variant.stock === 0 ? 'bg-red-100 text-red-700' :
                                    variant.stock <= 5 ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {variant.stock} units
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Variant Details Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                              <div className="text-center p-3 bg-white rounded-lg border">
                                <p className="text-xs text-gray-500 font-medium mb-1">Cost Price</p>
                                <p className="font-bold text-gray-900">₹{variant.costPrice.toLocaleString()}</p>
                              </div>
                              <div className="text-center p-3 bg-white rounded-lg border">
                                <p className="text-xs text-gray-500 font-medium mb-1">Selling Price</p>
                                <p className="font-bold text-gray-900">₹{variant.sellingPrice.toLocaleString()}</p>
                              </div>
                              <div className="text-center p-3 bg-white rounded-lg border">
                                <p className="text-xs text-gray-500 font-medium mb-1">Expiry Date</p>
                                <p className="font-bold text-gray-900">
                                  {variant.expiry === "N/A" ? "-" : new Date(variant.expiry).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            {/* Order Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center bg-white rounded-lg overflow-hidden border border-gray-300">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateQuantity(selectedProduct.id, variant.id, (orderQuantities[`${selectedProduct.id}-${variant.id}`]?.quantity || 0) - 1);
                                    }}
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <input
                                    type="number"
                                    min="0"
                                    max={variant.stock}
                                    value={orderQuantities[`${selectedProduct.id}-${variant.id}`]?.quantity || 0}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      updateQuantity(selectedProduct.id, variant.id, parseInt(e.target.value) || 0);
                                    }}
                                    className="w-16 px-2 py-2 text-center text-sm border-0 bg-transparent focus:outline-none"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateQuantity(selectedProduct.id, variant.id, (orderQuantities[`${selectedProduct.id}-${variant.id}`]?.quantity || 0) + 1);
                                    }}
                                    className="p-2 hover:bg-gray-100 transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                </div>
                                
                                <select
                                  value={orderQuantities[`${selectedProduct.id}-${variant.id}`]?.unit || "box"}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateUnit(selectedProduct.id, variant.id, e.target.value);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="box">Box</option>
                                  <option value="piece">Piece</option>
                                  <option value="pack">Pack</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Close
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(selectedProduct);
                      }}
                      className="px-8 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                      Add Selected to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add All to Cart Button */}
      <div className="fixed bottom-4 right-2 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={addAllToCart}
          className="flex items-center gap-2 px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-50 transition"
        >
        
          <span className="hidden sm:inline">Add All to </span>
          <span className="ml-2 bg-white text-blue-600 text-xs px-2 py-1 rounded-full">
            {Object.values(orderQuantities).reduce((sum, item) => sum + (item.quantity || 0), 0)}
          </span>
        </button>
        <button
          onClick={() => setShowCart(true)}
          className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="hidden sm:inline">Cart</span>
          <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {cartItems.length}
          </span>
        </button>
      </div>

      {/* Cart Component */}
      <RetailerCart 
        showCart={showCart}
        setShowCart={setShowCart}
        cartItems={cartItems}
        groupCartByDistributor={groupCartByDistributor}
        updateCartItemQuantity={updateCartItemQuantity}
        removeFromCart={removeFromCart}
        distributorInfo={distributorInfo}
        onOrderPlaced={(selectedDistributorIds) => {
        fetchInventoryVariantIds();
        setCartItems(prev =>
          prev.filter(item => !selectedDistributorIds.includes(item.distributorId))
        );
      }}
      />

      {/* Distributor Modal */}
{showDistributorModal && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center w-full">
    <div className="bg-white rounded-3xl shadow-lg w-full h-5/6 max-w-4xl mx-2 flex flex-col">
      {/* Blue Header */}
      <div className="bg-blue-800 text-white rounded-t-3xl p-6 relative flex items-center justify-between">
        <h2 className="text-xl font-bold">Select Distributor</h2>
        <button
          className="text-white hover:text-gray-300"
          onClick={() => {
            setShowDistributorModal(false);
            setModalDistributor(null);
          }}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6">
        {!modalDistributor ? (
          <>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search distributors..."
                value={distributorSearch}
                onChange={e => setDistributorSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-full border-2 focus:ring focus:ring-gray-300"
              />
            </div>
            <div className="space-y-2">
              {filteredDistributors.length === 0 && (
                <div className="text-gray-400 text-center py-4">No distributors found</div>
              )}
              {filteredDistributors.map(d => (
                <button
                  key={d}
                  className="w-full text-left px-4 py-2 rounded-3xl hover:bg-blue-200 transition"
                  onClick={() => setModalDistributor(d)}
                >
                  {distributorInfo[d]?.companyName || d}
                  {distributorInfo[d]?.ownerName && (
                    <span className="ml-2 text-gray-500 text-xs">
                      ({distributorInfo[d].ownerName})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center mb-4">
              <button
                className="mr-2 text-blue-700 hover:underline text-sm"
                onClick={() => setModalDistributor(null)}
              >
                ← Back
              </button>
              <span className="font-semibold text-blue-700">{modalDistributor}</span>
            </div>
            {modalProducts.length === 0 ? (
              <div className="text-gray-400 text-center py-4">No products for this distributor</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-2">Product</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Stock</th>
                    <th className="text-center py-2">Order</th>
                  </tr>
                </thead>
                <tbody>
                  {modalProducts.map(product =>
                    product.variants.map(variant => {
                      const inInventory = inventoryStockMap[variant._id] !== undefined;
                      return (
                        <tr key={variant._id} className="border-b last:border-b-0">
                          <td className="py-2">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{product.icon}</span>
                              <span>{product.name} <span className="text-xs text-gray-400">({variant.name})</span></span>
                            </div>
                          </td>
                          <td className="py-2 text-right">₹{variant.sellingPrice?.toLocaleString()}</td>
                          <td className="py-2 text-right">
                            {inInventory ? (
                              <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                Stock: {inventoryStockMap[variant._id]}
                              </span>
                            ) : (
                              <button
                                className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                                disabled={isAddingToInventory}
                                onClick={() => handleAddVariantToInventory(variant._id)}
                              >
                                {isAddingToInventory ? "Adding..." : "Add"}
                              </button>
                            )}
                          </td>
                          <td className="py-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => updateQuantity(product.id, variant.id, (orderQuantities[`${product.id}-${variant.id}`]?.quantity || 0) - 1)}
                                className="p-1 rounded-l bg-gray-100 hover:bg-gray-200"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <input
                                type="number"
                                min="0"
                                value={orderQuantities[`${product.id}-${variant.id}`]?.quantity || 0}
                                onChange={(e) => updateQuantity(product.id, variant.id, parseInt(e.target.value) || 0)}
                                className="w-10 px-1 py-1 text-center text-xs border-t border-b"
                              />
                              <button
                                onClick={() => updateQuantity(product.id, variant.id, (orderQuantities[`${product.id}-${variant.id}`]?.quantity || 0) + 1)}
                                className="p-1 rounded-r bg-gray-100 hover:bg-gray-200"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                              <select
                                value={orderQuantities[`${product.id}-${variant.id}`]?.unit || "box"}
                                onChange={(e) => updateUnit(product.id, variant.id, e.target.value)}
                                className="ml-2 text-xs border rounded px-2 py-1"
                              >
                                <option value="box">Box</option>
                                <option value="piece">Piece</option>
                                <option value="pack">Pack</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t">
        <button
          onClick={() => {
            // Add all selected variants to cart
            const itemsToAdd = [];
            modalProducts.forEach(product => {
              product.variants.forEach(variant => {
                const key = `${product.id}-${variant.id}`;
                const quantity = orderQuantities[key]?.quantity || 0;
                if (quantity > 0) {
                  // Robustly assign distributorId
                  const distributorId =
                    product.distributorId ||
                    (productData.find(p => String(p.id) === String(product.id))?.distributorId) ||
                    modalDistributor ||
                    undefined;

                  itemsToAdd.push({
                    id: key,
                    productId: product.id,
                    variantId: variant.id,
                    productName: product.name,
                    productIcon: product.icon,
                    variantName: variant.name,
                    price: variant.sellingPrice,
                    sku:variant.sku,
                    quantity,
                    unit: orderQuantities[key]?.unit || "box",
                    totalPrice: variant.sellingPrice * quantity,
                    distributorId, // <- always set
                    distributor: distributorInfo[distributorId]?.companyName || distributorId,
                    distributorName: distributorInfo[distributorId]?.companyName || distributorId
                  });
                }
              });
            });
            if (itemsToAdd.length === 0) {
              alert("Please select quantity for at least one variant");
              return;
            }
              setCartItems(prevCart => {
         const updatedCart = [...prevCart];

        itemsToAdd.forEach(newItem => {
          const existingIndex = updatedCart.findIndex(
            item => item.productId === newItem.productId && item.variantId === newItem.variantId
          );

          if (existingIndex !== -1) {
            const existingItem = updatedCart[existingIndex];
            const newQuantity = existingItem.quantity + newItem.quantity;
            updatedCart[existingIndex] = {
              ...existingItem,
              quantity: newQuantity,
              totalPrice: newQuantity * existingItem.price,
            };
          } else {
            updatedCart.push(newItem);
          }
    });

    return updatedCart;
  });
            // Reset quantities
            const resetQuantities = {};
            modalProducts.forEach(product => {
              product.variants.forEach(variant => {
                const key = `${product.id}-${variant.id}`;
                resetQuantities[key] = {
                  ...orderQuantities[key],
                  quantity: 0
                };
              });
            });
            setOrderQuantities(prev => ({
              ...prev,
              ...resetQuantities
            }));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Add Selected to Cart
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}