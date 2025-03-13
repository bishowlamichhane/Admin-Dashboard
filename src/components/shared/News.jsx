
const News = ({news}) => {
    console.log(news)
  return (
    <div className="flex flex-col mb-10">
        <h1 className="text-lg font-bold">{news.title}</h1>
        <p>{news.description}</p>
    </div>
  )
}

export default News