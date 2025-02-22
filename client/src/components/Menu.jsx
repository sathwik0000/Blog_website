import React from 'react'

const Menu = () => {
  const posts = [
        {
          id: 1,
          title: "The Future of AI in Web Development",
          desc: "Artificial Intelligence is revolutionizing the web development industry with automation and personalized experiences.",
          img: "https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg",
        },
        {
          id: 2,
          title: "10 Tips to Improve Your Coding Skills",
          desc: "Learn the best practices to enhance your programming skills and stay ahead in the tech industry.",
          img: "https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg",
        },
        {
          id: 3,
          title: "How to Build a Responsive Website",
          desc: "Responsive design is crucial in modern web development. Learn how to make your website mobile-friendly.",
          img: "https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg",
        },
        {
          id: 4,
          title: "Top 5 JavaScript Frameworks in 2025",
          desc: "Discover the most popular JavaScript frameworks that developers are using to build modern web applications.",
          img: "https://cdn.britannica.com/84/203584-050-57D326E5/speed-internet-technology-background.jpg",
        },
      ];
    


    return (
        <div className='Menu'>
            <div className='h'>
              <h2>Trending Posts</h2></div>
            {posts.map(post => (
                <div className="post" key={post.id}> 
                <img src={post.img} alt=""/>
                <h2>{post.title}</h2>
                <button>Read more </button>
                </div>
            )

            )}
        </div>
    )
};

export default Menu;