//模块化引入样式
import styles from "./Home.module.scss";
import ProjectDistributionMap from "@/components/projectDistributionMap/projectDistributionMap";

const Home = () => {
  return (
    <div className={styles.home}>
      <ProjectDistributionMap />
    </div>
  );
};

export default Home;
