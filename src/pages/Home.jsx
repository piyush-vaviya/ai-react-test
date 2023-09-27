import NavigationButton from "../components/NavigationButton";

function Home() {
  return (
    <>
      <div className="flex gap-2 m-auto">
        <NavigationButton text="Calculator" path="/calculator" />
        <NavigationButton text="Weather" path="/weather" />
        <NavigationButton text="Items" path="/items" />
      </div>
    </>
  );
}

export default Home;
