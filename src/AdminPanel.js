import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  ShoppingCart, 
  Package,
  CheckCircle,
  Clock,
  Menu, 
  X,
  Bell,
  Search,
  ChevronDown,
  Trash2,
  User,
  MapPin,
  Phone
} from 'lucide-react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase'; // Make sure this path is correct
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [adminInfo, setAdminInfo] = useState({ name:'', email:'' })

  const navigate = useNavigate()

  const staticProducts = [
  {
    image: require('./Images/Gaming-mouse.jpg'),
    title: "Gaming Mouse",
    description: "Precision and performance for every click.",
    price: 2500,
    quantity: 1,
    category: "Mouse",
  },
  {
    image: require('./Images/Bluetooth-speaker.jpg'),
    title: "Bluetooth Speaker",
    description: "Portable and powerful sound anywhere.",
    price: 4500,
    quantity: 1,
    category: "Speaker",
  },
  {
    image: require('./Images/Smart-watch.jpg'),
    title: "Smart Watch",
    description: "Track your health and fitness in style.",
    price: 8000,
    quantity: 1,
    category: "Watch",
  },
  {
    image: require('./Images/Wireless-heaadphones.jpg'),
    title: "Wireless Headphones",
    description: "High-quality sound with long battery life.",
    price: 6000,
    quantity: 1,
    category: "Headphones",
  },
];



  const fetchUsers = async () => {
  try {
    const q = query(collection(db, 'Signup'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const userList = [];
    querySnapshot.forEach((doc) => {
      userList.push({ id: doc.id, ...doc.data() });
    });
    setUsers(userList);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};


  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'pending', label: 'Pending Products', icon: Clock },
    { id: 'completed', label: 'Completed Orders', icon: CheckCircle },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'products', label: 'All Products', icon: Package },
  ];

  // Fetch pending products from PendingProducts collection
  const fetchPendingProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'PendingProducts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      setPendingProducts(products);
    } catch (error) {
      console.error('Error fetching pending products:', error);
    }
    setLoading(false);
  };


 
  // Fetch completed orders from Orders collection
  const fetchCompletedOrders = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'Orders'), orderBy('orderedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setCompletedOrders(orders);
    } catch (error) {
      console.error('Error fetching completed orders:', error);
    }
    setLoading(false);
  };

  // Delete pending product
  const deletePendingProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this pending product?')) {
      try {
        await deleteDoc(doc(db, 'PendingProducts', productId));
        fetchPendingProducts(); // Refresh the list
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product!');
      }
    }
  };

 useEffect(() => {
  fetchPendingProducts();
  fetchCompletedOrders();
  fetchUsers();

  const storedAdmin = localStorage.getItem("admin");
  if (storedAdmin) {
    const parsedAdmin = JSON.parse(storedAdmin);
    console.log("Fetched admin info from localStorage:", parsedAdmin); // Debug
    setAdminInfo(parsedAdmin);
  }
}, []);


  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Pending Products</h3>
                    <p className="text-3xl font-bold mt-2">{pendingProducts.length}</p>
                  </div>
                  <Clock size={40} className="opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Completed Orders</h3>
                    <p className="text-3xl font-bold mt-2">{completedOrders.length}</p>
                  </div>
                  <CheckCircle size={40} className="opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    <p className="text-3xl font-bold mt-2">
                      Rs{completedOrders.reduce((sum, order) => sum + (order.totalPrice || 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <ShoppingCart size={40} className="opacity-80" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">All Products</h3>
                    <p className="text-3xl font-bold mt-2">{pendingProducts.length + completedOrders.length}</p>
                  </div>
                  <Package size={40} className="opacity-80" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {completedOrders.slice(0, 3).map((order, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Order #{order.orderId} completed</p>
                        <p className="text-xs text-gray-500">by {order.name}</p>
                      </div>
                    </div>
                  ))}
                  {pendingProducts.slice(0, 2).map((product, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">New product added to cart</p>
                        <p className="text-xs text-gray-500">{product.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setActiveMenu('pending')}
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 font-medium transition-colors"
                  >
                    View Pending
                  </button>
                  <button 
                    onClick={() => setActiveMenu('completed')}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-600 font-medium transition-colors"
                  >
                    View Orders
                  </button>
                  <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-600 font-medium transition-colors">
                    Add Product
                  </button>
                  <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-600 font-medium transition-colors">
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
        case 'products':
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticProducts.map((product, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-green-600 font-semibold">Rs. {product.price?.toLocaleString()}</span>
                <span className="text-blue-600 font-semibold">Qty: {product.quantity}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-purple-600 font-bold">
                  Total: Rs. {(product.price * product.quantity).toLocaleString()}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  In Stock
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ProductList/>
      <div className="flex justify-end mb-4">
  <button
    onClick={() => navigate('/addproduct')}
    className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition-transform duration-300 transform hover:scale-110 animate-pop"
  >
    <span className="text-2xl font-bold">+</span>
  </button>
</div>

    </div>
  );


      case 'pending':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Pending Products</h2>
              <button 
                onClick={fetchPendingProducts}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingProducts.length === 0 ? (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    <Clock size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No pending products found</p>
                  </div>
                ) : (
                  pendingProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-green-600 font-semibold">Rs. {product.price?.toLocaleString()}</span>
                          <span className="text-blue-600 font-semibold">Qty: {product.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-purple-600 font-bold">Total: Rs. {product.total?.toLocaleString()}</span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            {product.status || 'Pending'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => deletePendingProduct(product.id)}
                            className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );
      
      case 'completed':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Completed Orders</h2>
              <button 
                onClick={fetchCompletedOrders}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Refresh
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {completedOrders.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <CheckCircle size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No completed orders found</p>
                  </div>
                ) : (
                  completedOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          {/* Product Image */}
                          <div className="lg:w-48 flex-shrink-0">
                            <img 
                              src={order.imageUrl} 
                              alt={order.productTitle}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                          
                          {/* Order Details */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="text-xl font-bold text-gray-800">Order #{order.orderId}</h3>
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                                {order.status || 'Completed'}
                              </span>
                            </div>
                            
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">{order.productTitle}</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <User size={16} className="text-gray-500" />
                                  <span className="font-medium">{order.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone size={16} className="text-gray-500" />
                                  <span>{order.phone}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                  <MapPin size={16} className="text-gray-500 mt-1" />
                                  <span className="text-sm">{order.address}</span>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Price per item:</span>
                                  <span className="font-semibold">Rs. {order.pricePerItem?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Quantity:</span>
                                  <span className="font-semibold">{order.quantity}x</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                  <span className="text-lg font-bold">Total:</span>
                                  <span className="text-lg font-bold text-green-600">Rs. {order.totalPrice?.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            
                            {order.orderedAt && (
                              <p className="text-sm text-gray-500">
                                Ordered on: {new Date(order.orderedAt.seconds * 1000).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );
      
       case 'users':
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Users</h2>
        <button 
          onClick={fetchUsers}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Users size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2"><strong>Phone:</strong> {user.phone}</p>
              {user.createdAt && (
                <p className="text-xs text-gray-500">
                  Joined on: {new Date(user.createdAt.seconds * 1000).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );


      default:
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {menuItems.find(item => item.id === activeMenu)?.label}
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <p className="text-gray-600 text-lg">
                This section is under development. Coming soon!
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-xl transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            {sidebarOpen && <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      activeMenu === item.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Sidebar Toggle */}
        <div className="p-4 border-t">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center p-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
       <header className="bg-white shadow-sm border-b px-6 py-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <Menu size={20} />
      </button>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search orders, products..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-80"
        />
      </div>
    </div>

    <div className="flex items-center space-x-4">
      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {pendingProducts.length}
        </span>
      </button>

      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {adminInfo.name 
              ? adminInfo.name
                  .split(' ')
                  .map(word => word[0])
                  .join('')
                  .toUpperCase()
              : 'AD'}
          </span>
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-gray-700">{adminInfo.name || "Admin"}</p>
          <p className="text-xs text-gray-500">{adminInfo.email || "admin@example.com"}</p>
        </div>
        <ChevronDown className="text-gray-400" size={16} />
      </div>
    </div>
  </div>
</header>


        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;