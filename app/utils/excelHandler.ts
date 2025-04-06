import * as XLSX from 'xlsx';
import { getDataPath, getAssetPath } from './paths';

// Define types for data
export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice: number | null;
  image: string;
  description: string;
  unit: string;
  inStock: boolean;
  category: string;
  quantity?: number;
  nutrition?: {
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
  };
  origin: string;
  storage?: string;
  popular?: boolean;
}

export interface Category {
  id: number | string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface StoreLocation {
  id: number;
  name: string;
  address: string;
  phone: string;
  position: { lat: number; lng: number };
  hours: string;
}

export interface CompanyInfo {
  name: string;
  logo: string;
  logoWhite: string;
  address: string[];
  phone: string[];
  email: string[];
  social: {
    facebook: string;
    zalo: string;
    instagram?: string;
  };
  businessHours: string;
}

export interface Promotion {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  discountPercent: number;
  image: string;
  code: string;
  isActive: boolean;
}

export interface AboutInfo {
  title: string;
  content: string[];
  image: string;
  mission: string;
  vision: string;
  values: string[];
  history: {
    year: number;
    event: string;
  }[];
}

// Load Excel file
export async function loadExcelData(filePath: string) {
  try {
    // Thêm timestamp để tránh cache
    const timestamp = Date.now();
    const filePathWithTimestamp = `${filePath}?t=${timestamp}`;
    
    console.log(`[Excel] Attempting to load Excel file from: ${filePathWithTimestamp}`);
    const response = await fetch(filePathWithTimestamp, { cache: 'no-store' });
    
    if (!response.ok) {
      console.error(`[Excel] Failed to fetch Excel file: ${response.status} ${response.statusText}`);
      return {
        products: [],
        categories: [],
        storeLocations: [],
        companyInfo: null,
        promotions: [],
        aboutInfo: null
      };
    }
    
    const arrayBuffer = await response.arrayBuffer();
    console.log(`[Excel] File loaded, size: ${arrayBuffer.byteLength} bytes`);
    
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    console.log(`[Excel] Workbook loaded, sheets: ${workbook.SheetNames.join(', ')}`);

    // Check if required sheets exist
    const requiredSheets = ['Products', 'Categories', 'StoreLocations', 'CompanyInfo'];
    const missingSheets = requiredSheets.filter(sheet => !workbook.SheetNames.includes(sheet));
    
    if (missingSheets.length > 0) {
      console.error(`[Excel] Missing required sheets: ${missingSheets.join(', ')}`);
    }

    // Extract sheets
    const productsSheet = workbook.Sheets['Products'];
    const categoriesSheet = workbook.Sheets['Categories'];
    const storeLocationsSheet = workbook.Sheets['StoreLocations'];
    const companyInfoSheet = workbook.Sheets['CompanyInfo'];
    const promotionsSheet = workbook.Sheets['Promotions'];
    const aboutInfoSheet = workbook.Sheets['AboutInfo'];

    // Parse sheets to JSON
    const products = productsSheet ? XLSX.utils.sheet_to_json<Product>(productsSheet) : [];
    const categories = categoriesSheet ? XLSX.utils.sheet_to_json<Category>(categoriesSheet) : [];
    const storeLocations = storeLocationsSheet ? XLSX.utils.sheet_to_json<StoreLocation>(storeLocationsSheet) : [];
    const companyInfo = companyInfoSheet ? XLSX.utils.sheet_to_json<CompanyInfo>(companyInfoSheet)[0] : null;
    const promotions = promotionsSheet ? XLSX.utils.sheet_to_json<Promotion>(promotionsSheet) : [];
    const aboutInfo = aboutInfoSheet ? XLSX.utils.sheet_to_json<AboutInfo>(aboutInfoSheet)[0] : null;

    console.log(`[Excel] Data loaded: ${products.length} products, ${categories.length} categories, ${storeLocations.length} locations, ${promotions.length} promotions`);

    // Log product image paths for debugging
    console.log('[Excel] Product image paths:');
    products.forEach((product, index) => {
      console.log(`[Excel] Product #${index + 1} - ${product.name}: Image path = ${product.image}`);
    });

    // Format data as needed
    const formattedProducts = products.map((product: Partial<Product>) => {
      // Đảm bảo đường dẫn hình ảnh đúng
      let imagePath = '/images/products/product-placeholder.svg';
      
      // Nếu có đường dẫn hình ảnh trong Excel, sử dụng nó
      if (product.image && typeof product.image === 'string') {
        const originalPath = product.image;
        console.log(`[Excel] Product ${product.name}: Original image path = ${originalPath}`);
        
        // Loại bỏ '/public' nếu có trong đường dẫn
        imagePath = originalPath.replace('/public/', '/');
        
        // Kiểm tra nếu đường dẫn đã bắt đầu bằng /
        if (!imagePath.startsWith('/')) {
          // Thêm / vào trước nếu chưa có
          imagePath = '/' + imagePath;
        }
        
        // Chuẩn hóa đường dẫn hình ảnh
        if (imagePath.includes('/images/products/')) {
          // Đã là đường dẫn hợp lệ
        } else if (imagePath.includes('images/products/')) {
          imagePath = '/' + imagePath;
        } else if (!imagePath.includes('/')) {
          // Nếu chỉ là tên file, thêm đường dẫn thư mục
          imagePath = '/images/products/' + imagePath;
        }
        
        console.log(`[Excel] Product ${product.name}: Normalized image path = ${imagePath}`);
      } else {
        // Nếu không có đường dẫn, sử dụng hình ảnh mặc định từ defaultProducts
        const defaultProduct = defaultProducts.find(p => p.id === product.id);
        if (defaultProduct && defaultProduct.image) {
          imagePath = defaultProduct.image;
          console.log(`[Excel] Product ${product.name}: Using default product image = ${imagePath}`);
        }
      }
      
      // Kiểm tra đường dẫn cuối cùng
      if (imagePath.includes('placeholder') || !imagePath.trim() || imagePath === '/images/products/undefined') {
        // Tìm đường dẫn từ defaultProducts
        const defaultProduct = defaultProducts.find(p => p.id === product.id);
        if (defaultProduct && defaultProduct.image) {
          imagePath = defaultProduct.image;
          console.log(`[Excel] Product ${product.name}: Replacing placeholder with default = ${imagePath}`);
        }
      }
      
      console.log(`[Excel] Product ${product.name}: Final image path = ${imagePath}`);
      
      // Đảm bảo trường popular được đọc từ Excel, nếu không có sẽ đặt mặc định là false
      const isPopular = product.popular !== undefined ? Boolean(product.popular) : false;
      
      return {
        ...product,
        discountPrice: product.discountPrice || null,
        inStock: Boolean(product.inStock),
        image: imagePath,
        popular: isPopular // Đảm bảo trường popular được bao gồm trong sản phẩm trả về
      };
    });

    // Log formatted product image paths for debugging
    console.log('[Excel] Formatted product image paths:');
    formattedProducts.forEach((product, index) => {
      console.log(`[Excel] Formatted Product #${index + 1} - ${product.name}: Image path = ${product.image}`);
    });

    // Format store locations to include position object
    const formattedStoreLocations = storeLocations.map((location: any) => {
      // Handle position_lat and position_lng from Excel
      if (location.position_lat && location.position_lng) {
        return {
          ...location,
          position: {
            lat: Number(location.position_lat),
            lng: Number(location.position_lng)
          }
        };
      }
      return location;
    });

    // Format company info to include arrays
    let formattedCompanyInfo = null;
    if (companyInfo) {
      const addressFields = ['address_1', 'address_2', 'address_3', 'address_4', 'address_5'];
      const phoneFields = ['phone_1', 'phone_2', 'phone_3', 'phone_4', 'phone_5'];
      const emailFields = ['email_1', 'email_2', 'email_3', 'email_4', 'email_5'];
      
      const addresses = addressFields
        .map(field => (companyInfo as any)[field])
        .filter(Boolean);
      
      const phones = phoneFields
        .map(field => (companyInfo as any)[field])
        .filter(Boolean);
      
      const emails = emailFields
        .map(field => (companyInfo as any)[field])
        .filter(Boolean);
      
      formattedCompanyInfo = {
        ...companyInfo,
        address: addresses,
        phone: phones,
        email: emails,
        social: {
          facebook: (companyInfo as any).facebook || '',
          zalo: (companyInfo as any).zalo || '',
          instagram: (companyInfo as any).instagram || ''
        }
      };
    }

    // Format about info to handle arrays
    let formattedAboutInfo = null;
    if (aboutInfo) {
      const contentFields = ['content_1', 'content_2', 'content_3', 'content_4', 'content_5'];
      const valueFields = ['value_1', 'value_2', 'value_3', 'value_4', 'value_5'];
      
      const content = contentFields
        .map(field => (aboutInfo as any)[field])
        .filter(Boolean);
      
      const values = valueFields
        .map(field => (aboutInfo as any)[field])
        .filter(Boolean);
      
      // Parse history from fields history_year_1, history_event_1, etc.
      const historyFields = Object.keys(aboutInfo).filter(k => k.startsWith('history_year_'));
      const historyEntries = historyFields.map(field => {
        const index = field.replace('history_year_', '');
        const year = (aboutInfo as any)[`history_year_${index}`];
        const event = (aboutInfo as any)[`history_event_${index}`];
        
        if (year && event) {
          return {
            year: Number(year),
            event: event
          };
        }
        return null;
      }).filter(Boolean);
      
      formattedAboutInfo = {
        ...(aboutInfo as any),
        content,
        values,
        history: historyEntries
      };
    }

    // Format categories to ensure image paths are correct
    const formattedCategories = categories.map((category: Partial<Category>) => {
      // Đảm bảo đường dẫn hình ảnh của danh mục đúng
      let imagePath = '/images/products/product-placeholder.svg';
      
      // Nếu có đường dẫn hình ảnh trong Excel, sử dụng nó
      if (category.image && typeof category.image === 'string') {
        const originalPath = category.image;
        console.log(`[Excel] Category ${category.name}: Original image path = ${originalPath}`);
        
        // Loại bỏ '/public' nếu có trong đường dẫn
        imagePath = originalPath.replace('/public/', '/');
        
        // Kiểm tra nếu đường dẫn đã bắt đầu bằng /
        if (!imagePath.startsWith('/')) {
          // Thêm / vào trước nếu chưa có
          imagePath = '/' + imagePath;
        }
        
        // Chuẩn hóa đường dẫn hình ảnh
        if (imagePath.includes('/images/products/')) {
          // Đã là đường dẫn hợp lệ
        } else if (imagePath.includes('images/products/')) {
          imagePath = '/' + imagePath;
        } else if (!imagePath.includes('/')) {
          // Nếu chỉ là tên file, thêm đường dẫn thư mục
          imagePath = '/images/products/' + imagePath;
        }
        
        console.log(`[Excel] Category ${category.name}: Normalized image path = ${imagePath}`);
      } else {
        // Nếu không có đường dẫn, sử dụng hình ảnh mặc định từ defaultCategories
        const defaultCategory = defaultCategories.find(c => c.id == category.id);
        if (defaultCategory && defaultCategory.image) {
          imagePath = defaultCategory.image;
          console.log(`[Excel] Category ${category.name}: Using default category image = ${imagePath}`);
        }
      }
      
      // Kiểm tra đường dẫn cuối cùng
      if (imagePath.includes('placeholder') || !imagePath.trim() || imagePath === '/images/products/undefined') {
        // Tìm đường dẫn từ defaultCategories
        const defaultCategory = defaultCategories.find(c => c.id == category.id);
        if (defaultCategory && defaultCategory.image) {
          imagePath = defaultCategory.image;
          console.log(`[Excel] Category ${category.name}: Replacing placeholder with default = ${imagePath}`);
        }
      }
      
      console.log(`[Excel] Category ${category.name}: Final image path = ${imagePath}`);
      
      // Đảm bảo id luôn có giá trị
      const id = category.id !== undefined ? category.id : 0;
      const name = category.name || 'Danh mục không tên';
      const slug = category.slug || `category-${id}`;
      const description = category.description || '';
      
      return {
        id,
        name,
        slug,
        description,
        image: imagePath
      } as Category;
    });

    return {
      products: formattedProducts as Product[],
      categories: formattedCategories,
      storeLocations: formattedStoreLocations,
      companyInfo: formattedCompanyInfo,
      promotions,
      aboutInfo: formattedAboutInfo
    };
  } catch (error) {
    console.error('Error loading Excel data:', error);
    return {
      products: [],
      categories: [],
      storeLocations: [],
      companyInfo: null,
      promotions: [],
      aboutInfo: null
    };
  }
}

// Function to load products with fallback to default data
export async function getProducts(): Promise<Product[]> {
  try {
    console.log('[Products] Fetching fresh products data from Excel');
    // Thử tải dữ liệu với đường dẫn tương đối trước
    let productsData = await loadExcelData(getDataPath('/data/tho-gio-data.xlsx'));
    
    // Nếu không có sản phẩm, thử với đường dẫn tuyệt đối
    if (productsData.products.length === 0) {
      console.log('[Products] Trying absolute path');
      productsData = await loadExcelData(getDataPath('/public/data/tho-gio-data.xlsx'));
    }
    
    // Nếu vẫn không có sản phẩm, thử với đường dẫn có /thitheo
    if (productsData.products.length === 0) {
      console.log('[Products] Trying with /thitheo path');
      productsData = await loadExcelData(getDataPath('/thitheo/data/tho-gio-data.xlsx'));
    }
    
    // Kiểm tra một lần nữa
    if (productsData.products && productsData.products.length > 0) {
      console.log(`[Products] Successfully loaded ${productsData.products.length} products from Excel`);
      
      // Kiểm tra xem dữ liệu sản phẩm có đúng không để debug
      console.log('[Products] First 2 products for debugging:');
      productsData.products.slice(0, 2).forEach((product, index) => {
        console.log(`[Products] Product #${index + 1}: ${product.name}`);
        console.log(`  - Image: ${product.image}`);
        console.log(`  - Price: ${product.price}, Discount: ${product.discountPrice}`);
        console.log(`  - Category: ${product.category}`);
      });
      
      return productsData.products;
    }
    
    console.log('[Products] No products found in Excel, returning fallback data');
    
    // In ra thông tin về defaultProducts để debug
    console.log('[Products] Returning defaultProducts:');
    defaultProducts.slice(0, 4).forEach((product, index) => {
      console.log(`[Products] Default product #${index + 1}: ${product.name}`);
      console.log(`  - Image path: ${product.image}`);
    });
    
    return defaultProducts;
  } catch (error) {
    console.error('[Products] Error loading products:', error);
    console.trace();  // Print stack trace for better debugging
    console.log('[Products] Returning fallback products due to error');
    
    // In ra thông tin về defaultProducts để debug
    console.log('[Products] Returning defaultProducts after error:');
    defaultProducts.slice(0, 4).forEach((product, index) => {
      console.log(`[Products] Default product #${index + 1}: ${product.name}`);
      console.log(`  - Image path: ${product.image}`);
    });
    
    return defaultProducts;
  }
}

// Function to load categories with fallback to default data
export async function getCategories(): Promise<Category[]> {
  try {
    console.log('[Categories] Fetching fresh categories data from Excel');
    // Thử tải dữ liệu với đường dẫn tương đối trước
    let categoriesData = await loadExcelData(getDataPath('/data/tho-gio-data.xlsx'));
    
    // Nếu không có danh mục, thử với đường dẫn tuyệt đối
    if (categoriesData.categories.length === 0) {
      console.log('[Categories] Trying absolute path');
      categoriesData = await loadExcelData(getDataPath('/public/data/tho-gio-data.xlsx'));
    }
    
    // Nếu vẫn không có danh mục, thử với đường dẫn có /thitheo
    if (categoriesData.categories.length === 0) {
      console.log('[Categories] Trying with /thitheo path');
      categoriesData = await loadExcelData(getDataPath('/thitheo/data/tho-gio-data.xlsx'));
    }
    
    // Kiểm tra một lần nữa
    if (categoriesData.categories && categoriesData.categories.length > 0) {
      console.log(`[Categories] Successfully loaded ${categoriesData.categories.length} categories from Excel`);
      
      // Kiểm tra xem dữ liệu danh mục có đúng không để debug
      console.log('[Categories] First 2 categories for debugging:');
      categoriesData.categories.slice(0, 2).forEach((category, index) => {
        console.log(`[Categories] Category #${index + 1}: ${category.name}`);
        console.log(`  - Image: ${category.image}`);
        console.log(`  - ID: ${category.id}, Slug: ${category.slug}`);
      });
      
      return categoriesData.categories;
    }
    
    console.log('[Categories] No categories found in Excel, returning fallback data');
    return defaultCategories;
  } catch (error) {
    console.error('[Categories] Error loading categories:', error);
    console.trace();  // Print stack trace for better debugging
    console.log('[Categories] Returning fallback categories due to error');
    return defaultCategories;
  }
}

// Function to load store locations with fallback to default data
export async function getStoreLocations(): Promise<StoreLocation[]> {
  try {
    const { storeLocations } = await loadExcelData('/data/tho-gio-data.xlsx');
    if (storeLocations && storeLocations.length > 0) {
      return storeLocations;
    }
    
    // Fallback to default data
    return defaultStoreLocations;
  } catch (error) {
    console.error('Error loading store locations:', error);
    return defaultStoreLocations;
  }
}

// Function to load company info with fallback to default data
export async function getCompanyInfo(): Promise<CompanyInfo> {
  try {
    const { companyInfo } = await loadExcelData('/data/tho-gio-data.xlsx');
    if (companyInfo) {
      return companyInfo as CompanyInfo;
    }
    
    // Fallback to default data
    return defaultCompanyInfo;
  } catch (error) {
    console.error('Error loading company info:', error);
    return defaultCompanyInfo;
  }
}

// Function to load promotions with fallback to default data
export async function getPromotions(): Promise<Promotion[]> {
  try {
    const { promotions } = await loadExcelData('/data/tho-gio-data.xlsx');
    if (promotions && promotions.length > 0) {
      return promotions;
    }
    
    // Fallback to default data
    return defaultPromotions;
  } catch (error) {
    console.error('Error loading promotions:', error);
    return defaultPromotions;
  }
}

// Function to load about info with fallback to default data
export async function getAboutInfo(): Promise<AboutInfo> {
  try {
    const { aboutInfo } = await loadExcelData('/data/tho-gio-data.xlsx');
    if (aboutInfo) {
      return aboutInfo as AboutInfo;
    }
    
    // Fallback to default data
    return defaultAboutInfo;
  } catch (error) {
    console.error('Error loading about info:', error);
    return defaultAboutInfo;
  }
}

// Default data as fallback
const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Thịt đùi heo',
    price: 150000,
    discountPrice: 135000,
    description: 'Thịt đùi heo tươi ngon, thích hợp cho các món kho, xào, rán...',
    unit: '1kg',
    category: 'thit-heo-tuoi',
    image: '/images/products/WyEj4GfSGOpnl56GRCM4I8EkdkgXqpn4m0atOv59.jpeg',
    origin: 'Việt Nam',
    inStock: true,
    popular: true,
    storage: 'Bảo quản lạnh 2-5°C',
    quantity: 100
  },
  {
    id: 2,
    name: 'Thịt ba chỉ',
    price: 180000,
    discountPrice: null,
    description: 'Thịt ba chỉ tươi ngon với lớp mỡ vừa phải, thích hợp để nướng, quay...',
    unit: '1kg',
    category: 'thit-heo-tuoi',
    image: '/images/products/bachi.jpg',
    origin: 'Việt Nam',
    inStock: true,
    popular: true,
    storage: 'Bảo quản lạnh 2-5°C',
    quantity: 80
  },
  {
    id: 3,
    name: 'Sườn non',
    price: 200000,
    discountPrice: 180000,
    description: 'Sườn non mềm, nhiều thịt, thích hợp để nướng, kho, om...',
    unit: '1kg',
    category: 'thit-heo-tuoi',
    image: '/images/products/suon-non.jpg',
    origin: 'Việt Nam',
    inStock: true,
    popular: true,
    storage: 'Bảo quản lạnh 2-5°C',
    quantity: 75
  },
  {
    id: 4,
    name: 'Xương heo',
    price: 80000,
    discountPrice: null,
    description: 'Xương heo tươi ngon, thích hợp nấu nước dùng, súp...',
    unit: '1kg',
    category: 'thit-heo-tuoi',
    image: '/images/products/topmo.jpg',
    origin: 'Việt Nam',
    inStock: true,
    popular: true,
    storage: 'Bảo quản lạnh 2-5°C',
    quantity: 90
  },
  {
    id: 5,
    name: 'Nạc Vai',
    price: 120000,
    discountPrice: 110000,
    image: '/images/products/product-placeholder.svg',
    description: 'Thịt nạc vai ít mỡ, thích hợp để làm nhiều món ăn khác nhau.',
    unit: '500g',
    inStock: true,
    category: 'thit-heo-tuoi',
    quantity: 75,
    origin: 'Việt Nam',
    storage: 'Bảo quản ở nhiệt độ 0-4°C hoặc trong ngăn đá tủ lạnh',
  },
  {
    id: 6,
    name: 'Chân Giò',
    price: 90000,
    discountPrice: 0,
    image: '/images/products/product-placeholder.svg',
    description: 'Chân giò heo ngon, thích hợp để hầm, ninh nhừ hoặc nấu canh.',
    unit: '500g',
    inStock: true,
    category: 'thit-heo-tuoi',
    quantity: 60,
    origin: 'Việt Nam',
    storage: 'Bảo quản ở nhiệt độ 0-4°C hoặc trong ngăn đá tủ lạnh',
  },
  {
    id: 7,
    name: 'Nạc Đùi',
    price: 130000,
    discountPrice: 0,
    image: '/images/products/product-placeholder.svg',
    description: 'Thịt nạc đùi chất lượng cao, thích hợp cho món xào hoặc nướng.',
    unit: '500g',
    inStock: true,
    category: 'thit-heo-tuoi',
    quantity: 90,
    origin: 'Việt Nam',
    storage: 'Bảo quản ở nhiệt độ 0-4°C hoặc trong ngăn đá tủ lạnh',
  },
  {
    id: 8,
    name: 'Sườn Cốt Lết',
    price: 180000,
    discountPrice: 160000,
    image: '/images/products/product-placeholder.svg',
    description: 'Sườn cốt lết dày thịt, thích hợp để nướng hoặc chiên.',
    unit: '500g',
    inStock: true,
    category: 'thit-heo-tuoi',
    quantity: 70,
    origin: 'Việt Nam',
    storage: 'Bảo quản ở nhiệt độ 0-4°C hoặc trong ngăn đá tủ lạnh',
  },
  {
    id: 9,
    name: 'Thịt Xay',
    price: 100000,
    discountPrice: 0,
    image: '/images/products/product-placeholder.svg',
    description: 'Thịt heo xay sẵn, tiện lợi cho việc nấu nướng.',
    unit: '500g',
    inStock: true,
    category: 'thit-heo-tuoi',
    quantity: 120,
    origin: 'Việt Nam',
    storage: 'Bảo quản ở nhiệt độ 0-4°C hoặc trong ngăn đá tủ lạnh',
  },
  {
    id: 10,
    name: 'Cốt Lết Đông Lạnh',
    price: 160000,
    discountPrice: 145000,
    image: '/images/products/product-placeholder.svg',
    description: 'Cốt lết heo đông lạnh nhập khẩu, chất lượng cao.',
    unit: '500g',
    inStock: true,
    category: 'thit-heo-dong-lanh',
    quantity: 85,
    origin: 'Úc',
    storage: 'Bảo quản trong ngăn đá tủ lạnh ở nhiệt độ dưới -18°C',
  },
];

const defaultCategories: Category[] = [
  {
    id: 1,
    name: 'Thịt Heo Tươi',
    slug: 'thit-heo-tuoi',
    description: 'Thịt heo tươi ngon, được đảm bảo nguồn gốc và an toàn thực phẩm',
    image: '/images/categories/thitheotuoi.png'
  },
  {
    id: 2,
    name: 'Thịt Heo Đông Lạnh',
    slug: 'thit-heo-dong-lanh',
    description: 'Thịt heo đông lạnh giữ nguyên dưỡng chất và hương vị',
    image: '/images/categories/donglanh.jpg'
  },
  {
    id: 3,
    name: 'Thịt Heo Chế Biến',
    slug: 'thit-heo-che-bien',
    description: 'Các sản phẩm từ thịt heo đã được sơ chế và chế biến sẵn',
    image: '/images/categories/bachi.jpg'
  },
  {
    id: 4,
    name: 'Sản Phẩm Đặc Biệt',
    slug: 'san-pham-dac-biet',
    description: 'Các sản phẩm đặc biệt và cao cấp từ thịt heo',
    image: '/images/categories/suon-non.jpg'
  }
];

const defaultStoreLocations: StoreLocation[] = [
  {
    id: 1,
    name: 'Tho Giò - Chi Nhánh 1',
    address: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    phone: '0987654321',
    position: { lat: 10.7758, lng: 106.7029 },
    hours: '08:00 - 22:00',
  },
  {
    id: 2,
    name: 'Tho Giò - Chi Nhánh 2',
    address: '456 Lê Văn B, Quận 2, TP.HCM',
    phone: '0987654322',
    position: { lat: 10.7868, lng: 106.7329 },
    hours: '08:00 - 22:00',
  }
];

const defaultCompanyInfo: CompanyInfo = {
  name: 'Tho Giò',
  logo: '/images/tho-gio-logo.svg',
  logoWhite: '/images/tho-gio-logo-white.svg',
  address: ['123 Nguyễn Văn A, Quận 1, TP.HCM', '456 Lê Văn B, Quận 2, TP.HCM'],
  phone: ['0987654321', '0987654322'],
  email: ['info@thogio.vn', 'hotro@thogio.vn'],
  social: {
    facebook: 'https://facebook.com/thogio',
    zalo: 'https://zalo.me/thogio'
  },
  businessHours: '08:00 - 22:00 (Tất cả các ngày)'
};

const defaultPromotions: Promotion[] = [
  {
    id: 1,
    title: 'Giảm giá 15% cho đơn hàng trên 500.000đ',
    description: 'Nhập mã THOGIO15 để được giảm 15% cho đơn hàng trên 500.000đ.',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    discountPercent: 15,
    image: '/images/products/product-placeholder.svg',
    code: 'THOGIO15',
    isActive: true
  },
  {
    id: 2,
    title: 'Mua 2 tặng 1 sản phẩm cùng loại',
    description: 'Khi mua 2 sản phẩm cùng loại sẽ được tặng 1 sản phẩm tương tự.',
    startDate: '2025-04-10',
    endDate: '2025-04-20',
    discountPercent: 33,
    image: '/images/products/product-placeholder.svg',
    code: 'MUA2TANG1',
    isActive: true
  }
];

const defaultAboutInfo: AboutInfo = {
  title: 'Về Tho Giò',
  content: [
    'Tho Giò là thương hiệu chuyên cung cấp các sản phẩm thịt heo tươi ngon, sạch, đảm bảo an toàn vệ sinh thực phẩm, được kiểm soát nghiêm ngặt từ khâu chăn nuôi đến khi đến tay người tiêu dùng.',
    'Được thành lập vào năm 2020, Tho Giò đã nhanh chóng trở thành thương hiệu uy tín và được nhiều người tiêu dùng tin tưởng lựa chọn.',
    'Chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng cao nhất với giá cả hợp lý.',
  ],
  image: '/images/products/product-placeholder.svg',
  mission: 'Cung cấp thịt heo tươi ngon, sạch, đảm bảo an toàn vệ sinh thực phẩm đến tay người tiêu dùng.',
  vision: 'Trở thành thương hiệu hàng đầu trong lĩnh vực cung cấp thịt heo sạch tại Việt Nam.',
  values: [
    'Chất lượng là hàng đầu',
    'Uy tín là nền tảng',
    'Khách hàng là trọng tâm',
    'Phát triển bền vững'
  ],
  history: [
    {
      year: 2020,
      event: 'Thành lập Tho Giò với cửa hàng đầu tiên tại Quận 1, TP.HCM'
    },
    {
      year: 2021,
      event: 'Mở rộng với cửa hàng thứ hai tại Quận 2, TP.HCM'
    },
    {
      year: 2022,
      event: 'Ra mắt website bán hàng trực tuyến'
    },
    {
      year: 2023,
      event: 'Được chứng nhận HACCP về an toàn thực phẩm'
    }
  ]
}; 