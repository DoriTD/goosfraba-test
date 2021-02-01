import Histogram from "./Histogram.jsx";
export default () => {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      let response = await fetch("https://fakerql.stephix.uk/graphql", {
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query: `{
              allPosts(count: 200) {
                id
                createdAt
              }
            }
              `,
        }),
        method: "POST",
      });
      let posts = await response.json();
      posts = posts.data.allPosts;

      let postsByMonth = posts.reduce(
        (acc, post) => {
          let month = moment(post.createdAt, "x").format("MMM");
          let year = moment(post.createdAt, "x").format("YYYY");

          if (year == 2019) {
            acc[month]++;
          }

          return acc;
        },
        {
          Jan: 0,
          Feb: 0,
          Mar: 0,
          Apr: 0,
          May: 0,
          Jun: 0,
          Jul: 0,
          Aug: 0,
          Sep: 0,
          Oct: 0,
          Nov: 0,
          Dec: 0,
        }
      );

      let postsByMonthSorted = Object.keys(postsByMonth).map((month) => {
        return {
          name: month,
          value: postsByMonth[month],
        };
      });
      setChartData(postsByMonthSorted);
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <div className="chart">
        <h2>Posts in 2019</h2>
        <Histogram data={chartData} width={500} height={500} />
      </div>
    </div>
  );
};
