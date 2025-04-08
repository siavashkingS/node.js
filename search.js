require('dotenv').config();
const db = require('./connection'); // Your existing connection file
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Display results function
function displayResults(results) {
  console.log('\nSearch Results:');
  if (results.length === 0) {
    console.log('No products found matching your criteria.');
  } else {
    results.forEach((product, index) => {
      console.log(`\n${index + 1}. ${product.name}`);
      console.log(`   Description: ${product.description}`);
      console.log(`   Price: $${product.price}`);
      console.log(`   Category: ${product.category}`);
    });
    console.log(`\nFound ${results.length} product(s).`);
  }
  mainMenu();
}

// Search functions
function searchById() {
  rl.question('Enter product ID: ', (id) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (error, results) => {
      if (error) throw error;
      displayResults(results);
    });
  });
}

function searchByName() {
  rl.question('Enter product name (or part of name): ', (name) => {
    db.query('SELECT * FROM products WHERE name LIKE ?', [`%${name}%`], (error, results) => {
      if (error) throw error;
      displayResults(results);
    });
  });
}

function searchByPriceRange() {
  rl.question('Enter minimum price: ', (minPrice) => {
    rl.question('Enter maximum price: ', (maxPrice) => {
      db.query(
        'SELECT * FROM products WHERE price BETWEEN ? AND ? ORDER BY price',
        [minPrice, maxPrice],
        (error, results) => {
          if (error) throw error;
          displayResults(results);
        }
      );
    });
  });
}

function searchByCategory() {
  db.query('SELECT DISTINCT category FROM products', (error, categories) => {
    if (error) throw error;
    
    console.log('\nAvailable Categories:');
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.category}`);
    });
    
    rl.question('\nEnter category number or name: ', (answer) => {
      const category = isNaN(answer) 
        ? answer 
        : categories[parseInt(answer) - 1]?.category;
      
      if (!category) {
        console.log('Invalid category selection.');
        return mainMenu();
      }
      
      db.query(
        'SELECT * FROM products WHERE category = ?',
        [category],
        (error, results) => {
          if (error) throw error;
          displayResults(results);
        }
      );
    });
  });
}

function generalSearch() {
  rl.question('Enter search term (will search all fields): ', (term) => {
    db.query(
      `SELECT * FROM products 
       WHERE name LIKE ? OR description LIKE ? OR category LIKE ?`,
      [`%${term}%`, `%${term}%`, `%${term}%`],
      (error, results) => {
        if (error) throw error;
        displayResults(results);
      }
    );
  });
}

// Main menu
function mainMenu() {
  console.log(`
=== Product Search System ===
1. Search by ID
2. Search by name
3. Search by price range
4. Search by category
5. General search (all fields)
6. Exit
`);

  rl.question('Select an option (1-6): ', (choice) => {
    switch(choice) {
      case '1':
        searchById();
        break;
      case '2':
        searchByName();
        break;
      case '3':
        searchByPriceRange();
        break;
      case '4':
        searchByCategory();
        break;
      case '5':
        generalSearch();
        break;
      case '6':
        console.log('Goodbye!');
        rl.close();
        db.end();
        break;
      default:
        console.log('Invalid option. Please try again.');
        mainMenu();
    }
  });
}

// Start the application
mainMenu();