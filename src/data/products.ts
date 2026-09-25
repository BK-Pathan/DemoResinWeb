import { reactive } from 'vue'

export interface ProductSize {
  label: string
  price: number
}

export interface Product {
  id: string
  name: string
  note: string
  category: string
  price?: number
  rating?: number
  trending?: boolean
  image: string,
  description?: string
  sizes?: ProductSize[]
}

export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'jewellery', label: 'Jewellery' },
  { id: 'home', label: 'Home Décor' },
  { id: 'trays', label: 'Trays & Coasters' },
  { id: 'accessories', label: 'Pens & Accessories' },
  { id: 'custom', label: 'Custom & Keepsakes' }
]

export const products: Product[] = [
  {
    id: 'wall-clock',
    name: 'Wall Clock',
    note: 'Different sizes',
    category: 'home',
    price: 3500,
    trending: true,
    image: 'https://i.pinimg.com/736x/c0/e1/72/c0e17217bf53f4ac34b41c5e8488e67a.jpg',
    sizes: [
      { label: '12 inch', price: 3500 },
      { label: '14 inch', price: 4500 },
      { label: '16 inch', price: 5500 }
    ],
    description: 'A beautiful wall clock made with resin and wood. Perfect for your living room or office. Available in different sizes. '
  },
  {
    id: 'quran-rehal',
    name: 'Quran Rehal',
    note: '',
    category: 'home',
    price: 3500,
    image: 'https://i.pinimg.com/1200x/b9/a5/dc/b9a5dc4cde4cafb60eecd9f576f9ff78.jpg'
  },
  {
    id: 'earrings',
    name: 'Resin Earrings',
    note: '',
    category: 'jewellery',
    price: 1200,
    image: 'https://i.pinimg.com/736x/bc/86/de/bc86def8ad2ba311406b2a6d8fcb9831.jpg'
  },
  {
    id: 'jhumka',
    name: 'Resin Jhumka',
    note: '',
    category: 'jewellery',
    price: 1000,
    trending: true,
    image: 'https://i.pinimg.com/736x/48/d2/b5/48d2b5598c9d32d44def8c722501e4db.jpg'
  },
  {
    id: 'locket',
    name: 'Resin Locket',
    note: '',
    category: 'jewellery',
    price: 1500,
    image: 'https://i.pinimg.com/736x/8c/9f/40/8c9f40bf6eb626d41b4bb06a5f1d86fb.jpg'
  },
  {
    id: 'ring',
    name: 'Resin Ring',
    note: '',
    category: 'jewellery',
    price: 900,
    image: 'https://i.pinimg.com/1200x/91/cc/7f/91cc7fa407f7df92d10842147d6f611f.jpg'
  },
  {
    id: 'coasters',
    name: 'Resin Coasters',
    note: 'Different sizes',
    category: 'trays',
    price: 1500,
    image: 'https://i.pinimg.com/1200x/a9/c9/0d/a9c90d02ab2850f0d5f7e1bcefc854be.jpg',
    sizes: [
      { label: 'Size 5', price: 1500 },
      { label: 'Size 7', price: 1800 },
      { label: 'Size 8', price: 2000 },
      { label: 'Size 9', price: 2200 },
      { label: 'Size 10', price: 2500 }
    ]
  },
  {
    id: 'pen',
    name: 'Resin Pen',
    note: '',
    category: 'accessories',
    price: 800,
    image: 'https://i.pinimg.com/736x/4d/d4/63/4dd4632d1d1cb55cde3a2a609abcb769.jpg'
  },
  {
    id: 'heart-frame',
    name: 'Heart Frame',
    note: '',
    category: 'home',
    price: 2800,
    image: 'https://i.pinimg.com/1200x/50/dd/92/50dd9235908ebeb6a9d73759d88458ba.jpg'
  },
  {
    id: 'trinkets-tray',
    name: 'Trinkets Tray',
    note: '',
    category: 'trays',
    price: 2500,
    image: 'https://i.pinimg.com/736x/22/b9/59/22b959ba5285b1136ef019dcb5bd4817.jpg'
  },
  {
    id: 'bookmark',
    name: 'Resin Bookmark',
    note: '',
    category: 'accessories',
    price: 650,
    image: 'https://i.pinimg.com/736x/c1/9c/b5/c19cb5f3315adc6b17c2b1634ac44059.jpg'
  },
  {
    id: 'nikkah-tray',
    name: 'Nikkah Tray',
    note: 'Different sizes',
    category: 'trays',
    price: 3800,
    trending: true,
    image: 'https://i.pinimg.com/1200x/bd/50/59/bd50592e2b2aa9d2c62a0e5640d3668d.jpg',
    sizes: [
      { label: 'Size 8', price: 3800 },
      { label: 'Size 9', price: 4600 }
    ]
  },
  {
    id: 'keyrings',
    name: 'Resin Keyrings',
    note: 'Different styles',
    category: 'accessories',
    price: 700,
    image: 'https://i.pinimg.com/736x/ef/a8/f6/efa8f6b5b3465d50081b5dfa467b21ae.jpg'
  },
  {
    id: 'customized-pen',
    name: 'Customized Pen',
    note: 'Made with your name or design',
    category: 'custom',
    price: 1200,
    trending: true,
    image: 'https://i.pinimg.com/736x/2e/f1/bd/2ef1bd25f92709acec24a3fddd41ba6c.jpg'
  },
  {
    id: 'tray',
    name: 'Resin Tray',
    note: '',
    category: 'trays',
    price: 3000,
    image: 'https://i.pinimg.com/736x/48/c4/0c/48c40c74a3d301857001f64681cc43e8.jpg'
  },
  {
    id: 'preservation',
    name: 'Resin Preservation',
    note: 'Keep flowers and memories forever',
    category: 'custom',
    price: 4200,
    image: 'https://i.pinimg.com/736x/d3/fd/26/d3fd26c71ea2eb1d376d0c5bab70ff31.jpg',
    sizes: [
      { label: 'Size 7', price: 4200 },
      { label: 'Size 8', price: 5000 },
      { label: 'Size 9', price: 5800 }
    ]
  },
  {
    id: 'jewellery-box',
    name: 'Jewellery Box',
    note: '',
    category: 'home',
    price: 3500,
    image: 'https://i.pinimg.com/1200x/a0/22/46/a022469178b9779f0d76c2f07d492bd9.jpg'
  },
  {
    id: 'photo-frame',
    name: 'Photo Frame',
    note: 'Different sizes',
    category: 'home',
    price: 3000,
    image: 'https://i.pinimg.com/1200x/f5/4f/82/f54f82bacb2fb92595146efac714380c.jpg',
        sizes: [
      { label: 'Size 5', price: 1500 },
      { label: 'Size 7', price: 1800 },
      { label: 'Size 8', price: 2000 },
      { label: 'Size 9', price: 2200 },
      { label: 'Size 10', price: 2500 }
        ]
  },
  {
    id: 'pen-holder',
    name: 'Pen Holder',
    note: '',
    category: 'accessories',
    price: 1800,
    image: 'https://i.pinimg.com/736x/3e/53/68/3e5368144dff99d1217586400fb73fcf.jpg'
  },
  {
    id: 'serving-tray',
    name: 'Serving Tray',
    note: '',
    category: 'trays',
    price: 4500,
    image: 'https://i.pinimg.com/1200x/ca/b8/39/cab83903fedfba1a2e2f8de8b5701a06.jpg'
  }
]

/* =========================================================
   CART
========================================================= */

export const cart = reactive<Product[]>([])

export const addToCart = (product: Product) => {
  const alreadyInCart = cart.some(
    item => item.id === product.id
  )

  if (!alreadyInCart) {
    cart.push(product)
  }
}

export const removeFromCart = (productId: string) => {
  const index = cart.findIndex(
    item => item.id === productId
  )

  if (index !== -1) {
    cart.splice(index, 1)
  }
}

export const clearCart = () => {
  cart.splice(0, cart.length)
}

export const getCartCount = () => {
  return cart.length
}

export const getCartTotal = () => {
  return cart.reduce(
    (total, product) => total + (product.price ?? 0),
    0
  )
}

/* =========================================================
   PRICE CHECK
========================================================= */

export const hasPrice = (
  product: Product
): product is Product & { price: number } =>
  typeof product.price === 'number'

export const getProductById = (id: string) =>
  products.find(product => product.id === id)