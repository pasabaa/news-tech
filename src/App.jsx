import React, {useState, useEffect} from 'react'
import axios from 'axios'
import uuid from 'react-uuid';

function App() {

  const [news, setNews] = useState([]);
  const descriptionBlog = 'On my blog, I will provide daily news on a wide range of topics, such as new product releases, software and operating system updates, advances in artificial intelligence and machine learning, the latest trends in mobile and web development, and updates on cybersecurity and privacy issues. This news will be available through a variety of sources, such as online news websites, technology blogs and social networking platforms.'

  const getNews = () => {

    axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`)
    .then(res => setNews(res.data.articles))
    .catch(error => console.log(error))

    console.log(news)

  }


  useEffect(()=> {

    getNews();

  }, [])

  return (
    <div className='grid place-content-center p-8'>
      <div className='w-8/12 mx-auto mt-44 sm:w-full sm:mt-16'>

        <div className='mb-8 w-7/12 sm:w-full'>
          <h1 className='text-6xl font-bold'>Technology News</h1>
          <p className='text-gray-500 leading-relaxed mt-6'>{descriptionBlog}</p>
        </div>

        <div className='grid grid-cols-3 gap-8 sm:grid-cols-1'>
          {
            news.map(item => {
              return (

                <div key={uuid()} className='p-6 bg-gray-100/30 shadow-sm'>
                  <div className='flex justify-center'>
                    {
                      item.urlToImage === null 
                      ? 
                      <img loading='lazy' className='object-cover h-44 w-full' src='https://dummyimage.com/1280x720/171517/666566.png&text=404' alt="404 Not Found" /> 
                      : 
                      <img loading='lazy' className='object-cover h-44 w-full' src={item.urlToImage} alt="" />
                    }
                  </div>
                  <p className='font-semibold text-sm mt-5'>{item.author}</p>
                  <h1 className='text-lg font-bold mt-2 text-truncation'>{item.title}</h1>
                  <hr className='my-2' />
                  <p className='text-sm mt-2 text-truncation'>{item.description}</p>
                  <a href={item.url} target={'_blank'} rel={'nofollow noopener noreferrer'} className='py-2 px-3 bg-gray-100 text-sm text-gray-500 mt-4 inline-block hover:bg-gray-200 hover:text-gray-600 transition'>Read More</a>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>

  )
}

export default App
