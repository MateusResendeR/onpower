import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { BlogPost } from '../../types/blog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          updatedAt: doc.data().updatedAt.toDate(),
        })) as BlogPost[];
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Erro ao buscar posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Blog OnPower
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>{format(post.createdAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-[#EAFD5C] px-2 py-1 rounded-full text-xs text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-block bg-black text-[#EAFD5C] px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Ler mais
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog; 