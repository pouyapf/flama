import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import css from '../../../styles/adminaddpost.module.css';
import requireAdminAuth from '../../../lib/requireAdminAuth';
import { IoMdAddCircle } from "react-icons/io";
const QuillEditor = dynamic(() => import('../../../components/QuillEditor/QuillEditor'), {
  ssr: false,
});

function Admin() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showadd, setshowadd] = useState(false);

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session || !session.user) return <p>Access Denied</p>;

  const handleFileChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleRemoveCategory = (category) => {
    setCategories(categories.filter((cat) => cat !== category));
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('summary', summary);
    formData.append('categories', JSON.stringify(selectedCategories));
    if (mainImage) {
      formData.append('file', mainImage);
    }

    try {
      const response = await axios.post('/api/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-secret-key': process.env.NEXT_PUBLIC_SECRET_KEY,
        },
      });

      if (response.data.success) {
        setSuccess('Post added successfully!');
        setTitle('');
        setContent('');
        setSummary('');
        setMainImage(null);
        setSelectedCategories([]);
      } else {
        setError(response.data.message || 'An error occurred.');
      }
    } catch (err) {
      setError('Failed to submit the post.');
    } finally {
      setLoading(false);
    }
  };

  function handleaddcat(){

setshowadd(!showadd)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col  justify-start items-center">
   <div className=' flex  w-full justify-around items-center'>


   <input
   className=' rounded-md p-3  border-2  w-1/4 border-bluebtn border-solid' 
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <textarea
       className=' p-3 rounded-md border-2  resize-none w-1/4 border-bluebtn border-solid' 
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        required
      />
      <label htmlFor="file" className={css.custom_file_upload}>
        <div className={css.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill='' d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"></path>
          </svg>
        </div>
    
        <input type="file" id="file" accept="image/*" onChange={handleFileChange} />
      </label>


   </div>
    

      <div className="  flex relative justify-between items-center w-full categories">
        <div className='  w-1/3 flex flex-col justify-start items-center  '>
        <span className=' flex justify-center gap-2 items-center'><span>دسته بندی ها:</span><IoMdAddCircle onClick={handleaddcat} /></span>
        <div className={`transition-all flex  flex-col justify-start items-center gap-3  w-full duration-300 ease-in ${showadd ? " h-auto opacity-1" :' h-0  opacity-0'}  `}>

<input
  className=' p-3 rounded-md border-2  resize-none  w-5/6 border-bluebtn border-solid' 
    type="text"
    placeholder="New category"
    value={newCategory}
    onChange={(e) => setNewCategory(e.target.value)}
  />
  <button type="button" className='bg-bluebtn p-4 text-white  rounded' onClick={handleAddCategory}>Add Category</button>


</div>



        </div>
       
       
      
   
     
        <div className="  flex-wrap flex items-center gap-2 justify-center w-2/3">
          {categories.map((category) => (
            <span
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`   p-4 pl-20 pr-20  rounded-md border-2 border-solid
                border-orangeidea ${selectedCategories.includes(category) ? ' bg-orangeee' : ''}`}
            >
              {category}
              <button type="button" onClick={() => handleRemoveCategory(category)}>x</button>
            </span>
          ))}
        </div>
      </div>

      <QuillEditor value={content} onChange={setContent} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <button type="submit" disabled={loading}>Add Post</button>

      <style jsx>{`
        .categories {
          margin-top: 20px;
        }
        .category-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .category-item {
          background-color: #f1f1f1;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          position: relative;
        }
        .category-item.selected {
          background-color: #0070f3;
          color: white;
        }
        .category-item button {
          background: transparent;
          border: none;
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
        }
      `}</style>
    </form>
  );
}

export default requireAdminAuth(Admin)