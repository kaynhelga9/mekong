const products = [
    {
        _id: '1',
        name: 'Airpods Wireless Bluetooth | Refurbished',
        image: '/images/airpods.jpg',
        description: {
            "general": {
                "dimensions": {
                "airpod": {
                    "height": "30.9 mm",
                    "width": "21.8 mm",
                    "depth": "24.0 mm"
                },
                "charging_case": {
                    "height": "45.2 mm",
                    "width": "60.6 mm",
                    "depth": "21.7 mm"
                }
                },
                "weight": {
                "airpod": "5.4 grams",
                "charging_case": "45.6 grams"
                },
                "charging_case": {
                "compatibility": [
                    "Qi-certified chargers",
                    "Lightning connector"
                ]
                }
            },
            "audio_technology": {
                "features": [
                "Active Noise Cancellation",
                "Transparency Mode",
                "Adaptive EQ",
                "Custom high-excursion Apple driver"
                ]
            }
        },
        brand: 'apple',
        category: 'electronics',
        price: 11.99,
        stock: 0,
        rating: 0,
        numReviews: 3000,
    },
    {
        _id: '5',
        name: 'PS5',
        image: '/images/playstation.jpg',
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat fugiat porro vero totam quis, sint ipsa nam enim, nemo quo excepturi culpa optio esse ducimus autem quibusdam dolore. Dolorem, explicabo',
        brand: 'apple',
        category: 'electronics',
        price: 12,
        stock: 10,
        rating: 1,
        numReviews: 3,
    },
    {
        _id: '2',
        name: 'Camera',
        image: '/images/camera.jpg',
        description: 'blah blah',
        brand: 'apple',
        category: 'electronics',
        price: 15,
        stock: 10,
        rating: 2.5,
        numReviews: 3,
    },
    {
        _id: '3',
        name: 'Mouse',
        image: '/images/mouse.jpg',
        description: 'blah blah',
        brand: 'apple',
        category: 'electronics',
        price: 16,
        stock: 10,
        rating: 4.64,
        numReviews: 3,
    },
    {
        _id: '4',
        name: 'Phone',
        image: '/images/phone.jpg',
        description: 'blah blah',
        brand: 'apple',
        category: 'electronics',
        price: 17,
        stock: 10,
        rating: 5,
        numReviews: 3,
    },
    
]

export default products