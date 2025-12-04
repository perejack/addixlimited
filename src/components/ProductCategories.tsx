import { Link } from "react-router-dom";

const ProductCategories = () => {
  const categories = [
    {
      name: "SHOES",
      image: "https://www.adixplastics.com/wp-content/uploads/2019/04/Untitled-1-Recovered-Recovered-Recovered-26.jpg",
      bgColor: "bg-sky-50"
    },
    {
      name: "TABLES, TROLLEYS & STOOLS", 
      image: "https://www.adixplastics.com/wp-content/uploads/2019/04/Untitled-1-Recovered-Recovered-Recovered-Recovered-1-thegem-product-catalog.jpg",
      bgColor: "bg-cyan-50"
    },
    {
      name: "TRAYS",
      image: "https://www.adixplastics.com/wp-content/uploads/2019/03/Serving-Tray-No.18-Printed-thegem-product-catalog.jpg",
      bgColor: "bg-emerald-50"
    },
    {
      name: "UTILITIES",
      image: "https://www.adixplastics.com/wp-content/uploads/2019/03/Untitled-1-Recovered-Recovered-Recovered-Recovered-13-thegem-product-catalog.jpg",
      bgColor: "bg-teal-50"
    },
    {
      name: "MUGS & PLATES",
      image: "https://www.adixplastics.com/wp-content/uploads/2019/04/Mug_No.338-thegem-product-catalog.jpg",
      bgColor: "bg-indigo-50"
    },
    {
      name: "CHAIRS",
      image: "https://www.adixplastics.com/wp-content/uploads/2019/04/Untitled-1-Recovered-Recovered-Recovered-Recovered-thegem-product-catalog.jpg",
      bgColor: "bg-orange-50"
    },
    {
      name: "CONTAINERS & JUGS",
      image: "https://www.adixplastics.com/wp-content/uploads/2019/04/Food_Storage_4Pcs_Per_set_Printed-thegem-product-catalog.jpg",
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category, index) => {
            const slug = category.name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");
            return (
              <Link
                key={index}
                to={`/category/${slug}`}
                className={`${category.bgColor} rounded-2xl p-4 text-center hover:shadow-card-hover transition-all duration-300 hover:scale-105 cursor-pointer group`}
              >
                <div className="mb-3 rounded-xl overflow-hidden bg-white aspect-square flex items-center justify-center">
                  <img src={category.image} alt={category.name} className="w-full h-full object-contain p-2" />
                </div>
                <h3 className="font-semibold text-sm text-gray-800 leading-tight">
                  {category.name}
                </h3>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;