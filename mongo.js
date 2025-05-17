const dbPromise = require('./mongoconnection');
const insertProduct = async () => {
  try {
    const db = await dbPromise; // Wait for the connection
    const result = await db.collection('products').insertOne({
      title: 'product1',
      price: 350000,
      slug: 'some-slug',
      stock: 125,
    });
    console.log('Inserted ID:', result.insertedId);
  } catch (err) {
    console.error('Error inserting product:', err);
  } finally {
    // Optional: Close the connection when done
    // await client.close();
  }
};

const readdata = async ()=>{
    try {
        const db = await dbPromise; // Wait for the connection
        const result = await db.collection('air').find({
            ratings:5
        }).toArray();
        console.log(result.map((result)=>result.name));
      } catch (err) {
        console.error('Error finding:', err);
      } finally {
        // Optional: Close the connection when done
        // await client.close();
      }
}

//insertProduct();
readdata();
