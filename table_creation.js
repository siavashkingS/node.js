require('dotenv').config();
const db=require('./connection');
db.query(`
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`,(error,result,fields)=>{
    if(error) throw error;
    console.log('Table created or already exist');
});
var sql ="INSERT INTO products (name, description, price, category) VALUES ?"
var values =[
    ['Laptop', 'High-performance laptop with 16GB RAM and 512GB SSD', 999.99, 'Electronics'],
    ['Smartphone', 'Latest smartphone with 5G and 128GB storage', 799.99, 'Electronics'],
    ['Headphones', 'Wireless noise-cancelling headphones', 249.99, 'Electronics'],
    ['Coffee Maker', 'Automatic coffee maker with timer', 89.99, 'Home'],
    ['Desk Chair', 'Ergonomic office chair with lumbar support', 199.99, 'Furniture'],
    ['Notebook', 'Premium quality 200-page notebook', 12.99, 'Stationery'],
    ['Pen Set', 'Set of 5 high-quality ballpoint pens', 9.99, 'Stationery'],
    ['Water Bottle', 'Insulated stainless steel water bottle', 24.99, 'Accessories'],
    ['Backpack', 'Water-resistant backpack with laptop compartment', 49.99, 'Accessories'],
    ['Smart Watch', 'Fitness tracker with heart rate monitor', 129.99, 'Electronics'],
    ['4K Smart TV', '55-inch 4K Ultra HD Smart TV with HDR', 599.99, 'Electronics'],
    ['Wireless Earbuds', 'True wireless earbuds with 20hr battery life', 129.99, 'Electronics'],
    ['Gaming Console', 'Next-gen gaming console with 1TB storage', 499.99, 'Electronics'],
    ['Bluetooth Speaker', 'Portable waterproof Bluetooth speaker', 79.99, 'Electronics'],
    ['E-Reader', 'High-resolution e-reader with backlight', 139.99, 'Electronics'],
    ['Drone', '4K camera drone with 30min flight time', 349.99, 'Electronics'],
    ['Fitness Tracker', 'Water-resistant fitness tracker with GPS', 89.99, 'Electronics'],
    ['External SSD', '1TB portable SSD with USB-C', 129.99, 'Electronics'],
    ['VR Headset', 'Virtual reality headset with controllers', 299.99, 'Electronics'],
    ['Digital Camera', '24MP mirrorless camera with 4K video', 799.99, 'Electronics'],
    ['Air Fryer', '5.8QT digital air fryer with 7 presets', 99.99, 'Home'],
    ['Robot Vacuum', 'Smart robot vacuum with app control', 249.99, 'Home'],
    ['Pressure Cooker', '6QT electric multi-cooker', 79.99, 'Home'],
    ['Bedding Set', 'Queen size 100% cotton bedding set', 89.99, 'Home'],
    ['Kitchen Knives', '8-piece premium stainless steel knife set', 69.99, 'Home'],
    ['Humidifier', 'Ultrasonic cool mist humidifier', 49.99, 'Home'],
    ['Stand Mixer', '5QT professional stand mixer', 299.99, 'Home'],
    ['Food Processor', '10-cup capacity food processor', 129.99, 'Home'],
    ['Dinnerware Set', '16-piece porcelain dinnerware set', 79.99, 'Home'],
    ['Air Purifier', 'HEPA air purifier for large rooms', 199.99, 'Home'],
    ['Executive Pen', 'Premium stainless steel ballpoint pen', 29.99, 'Stationery'],
    ['Leather Notebook', 'Genuine leather bound notebook', 24.99, 'Stationery'],
    ['Stapler', 'Heavy-duty steel stapler', 12.99, 'Stationery'],
    ['Whiteboard', '4x6 foot magnetic whiteboard', 89.99, 'Stationery'],
    ['Desk Organizer', '5-compartment wooden desk organizer', 34.99, 'Stationery'],
    ['Highlighters', 'Set of 8 fluorescent highlighters', 7.99, 'Stationery'],
    ['Paper Shredder', '12-sheet cross-cut paper shredder', 59.99, 'Stationery'],
    ['Fountain Pen', 'Luxury fountain pen with ink converter', 49.99, 'Stationery'],
    ['Sticky Notes', 'Assorted color sticky notes 10-pack', 5.99, 'Stationery'],
    ['Label Maker', 'Electronic label maker with QWERTY keyboard', 39.99, 'Stationery'],
    ['Leather Wallet', 'Genuine leather bifold wallet', 49.99, 'Accessories'],
    ['Sunglasses', 'UV protection polarized sunglasses', 79.99, 'Accessories'],
    ['Smartwatch Band', 'Premium leather smartwatch band', 34.99, 'Accessories'],
    ['Silk Scarf', '100% pure silk designer scarf', 59.99, 'Accessories'],
    ['Baseball Cap', 'Adjustable cotton twill cap', 24.99, 'Accessories'],
    ['Leather Belt', 'Genuine leather reversible belt', 39.99, 'Accessories'],
    ['Winter Gloves', 'Thermal insulated touchscreen gloves', 29.99, 'Accessories'],
    ['Travel Neck Pillow', 'Memory foam travel pillow', 19.99, 'Accessories'],
    ['Luggage Set', '3-piece hardshell spinner luggage set', 299.99, 'Accessories'],
    ['Designer Handbag', 'Signature designer tote bag', 199.99, 'Accessories'],
    ['Yoga Mat', 'Eco-friendly non-slip yoga mat', 29.99, 'Sports'],
    ['Dumbbell Set', 'Adjustable 40lb dumbbell set', 89.99, 'Sports'],
    ['Tent', '4-person waterproof camping tent', 149.99, 'Sports'],
    ['Running Shoes', 'Lightweight cushioned running shoes', 99.99, 'Sports'],
    ['Bicycle', '21-speed hybrid commuter bicycle', 349.99, 'Sports'],
    ['Fitness Mat', 'High-density exercise mat', 39.99, 'Sports'],
    ['Hiking Backpack', '50L waterproof hiking backpack', 79.99, 'Sports'],
    ['Jump Rope', 'Weighted speed jump rope', 14.99, 'Sports'],
    ['Golf Set', 'Complete golf club set with bag', 249.99, 'Sports'],
    ['Paddle Board', '10ft inflatable stand-up paddle board', 399.99, 'Sports']
]
db.query(sql, [values],(error,result,fields)=>{
    if(error) throw error;
    console.log("Number of records inserted: " + result.affectedRows);
});