const WeatherFooter = () => {
  return (
    <p className="text-center p-4 bg-dark text-light fw-bold mb-0">
      EpiWeather - {new Date().getFullYear()}
    </p>
  );
};

export default WeatherFooter;
