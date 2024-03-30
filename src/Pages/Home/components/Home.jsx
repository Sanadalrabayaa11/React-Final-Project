import { useContext } from "react";
import Categories from "../../Categories/components/Categories";
import { UserContext } from "../../../context/User";
import styles from "./Home.module.css";

function Home() {
  const { userName } = useContext(UserContext);
  return (
    <>
      <div className={styles.container}>
        <img src="cover.png" alt="cover11.png" className={styles.cover} />
        {userName && (
          <h3 className={`${styles["home-heading"]} text-info mb-5 mt-5 fs-1`}>
            Welcome {userName}
          </h3>
        )}
        <div className="row mt-5 ">
          <div className="col-md-6">
            <div className="card text-bg-info  mb-3 w-100">
              <div className="card-header fs-4 fw-bold">Kitchen utensils</div>
              <div className="card-body">
                <p className="card-text">
                  Essential tools for cooking and food preparation, kitchen
                  utensils enhance culinary experiences. From spatulas and
                  whisks to pots and pans, they facilitate the creation of
                  delicious meals with precision and efficiency. With the right
                  utensils, chefs can unleash their creativity in the kitchen.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card text-bg-info mb-3 w-100">
              <div className="card-header fs-4 fw-bold">Electronic Devices</div>
              <div className="card-body">
                <p className="card-text">
                  Revolutionizing communication and productivity, electronic
                  devices like smartphones and laptops have become indispensable
                  in modern life. They enable seamless connectivity with others,
                  providing access to information, entertainment, and services
                  at our fingertips. With their versatility and convenience
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card text-bg-info mb-3 w-100">
              <div className="card-header fs-4 fw-bold">Household utensils</div>
              <div className="card-body">
                <p className="card-text">
                  Functional items for everyday tasks, household utensils
                  simplify various chores and enhance organization. From kitchen
                  essentials like knives and cutting boards to cleaning tools
                  such as brooms and mops, these utensils contribute to the
                  smooth operation of a household. Their practicality and
                  efficiency streamline daily routines.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card text-bg-info mb-3 w-100">
              <div className="card-header fs-4 fw-bold">Clothes</div>
              <div className="card-body">
                <p className="card-text">
                  Fashionable attire not only reflects personal style but also
                  provides comfort for daily wear. From casual t-shirts and
                  jeans to elegant evening dresses, clothes serve as a means of
                  self-expression and confidence. With diverse fabrics, colors,
                  and styles, they play a pivotal role in shaping ones identity
                  and leaving a lasting impression.
                </p>
              </div>
            </div>
          </div>
        </div>
        <Categories />
        <div className="accordion " id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header ">
              <button
                className="accordion-button fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                E-commerce Item #1
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the first items accordion body.</strong>In the
                bustling landscape of online commerce, where convenience and
                accessibility reign supreme, the modern eCommerce website stands
                as a beacon of seamless transactions and boundless
                possibilities. With its intuitive user interface and robust
                backend infrastructure, the eCommerce platform offers a diverse
                array of products and services to cater to the ever-evolving
                needs of consumers worldwide. From the comfort of their homes,
                shoppers can explore a virtual marketplace brimming with an
                eclectic mix of merchandise, ranging from everyday essentials to
                niche specialties, all at their fingertips.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                E-commerce Item #2
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the second items accordion body.</strong> At the
                heart of the eCommerce experience lies a dynamic ecosystem
                fueled by innovation and technological prowess. Leveraging
                cutting-edge features such as personalized recommendations,
                secure payment gateways, and real-time inventory management, the
                platform orchestrates a harmonious dance between buyers and
                sellers, transcending geographical boundaries and temporal
                constraints. Whether its a bustling marketplace teeming with
                sellers vying for attention or a curated boutique showcasing
                artisanal craftsmanship, each corner of the eCommerce landscape
                offers a unique glimpse into the vibrant tapestry of global
                commerce
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                E-commerce Item #3
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <strong>This is the third items accordion body.</strong>{" "}
                Moreover, the eCommerce website serves as more than just a
                marketplace—it embodies a digital storefront where brands come
                to life, forging meaningful connections with their audience
                through captivating storytelling and immersive experiences.
                Through engaging multimedia content, interactive product
                showcases, and community-driven forums, brands foster a sense of
                belonging and loyalty among their customer base, transcending
                the transactional nature of commerce to cultivate lasting
                relationships built on trust, authenticity, and shared values.
                In this ever-evolving digital landscape, the eCommerce website
                stands as a testament to the boundless potential of technology
                to redefine the way we shop, connect, and experience the world
                around us.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
