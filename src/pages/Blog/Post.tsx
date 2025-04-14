import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, orderBy, addDoc, getDocs, DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { BlogPost, Comment } from '../../types/blog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      author: '',
      content: '',
    },
    validationSchema: Yup.object({
      author: Yup.string().required('Nome é obrigatório'),
      content: Yup.string().required('Comentário é obrigatório'),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!id) return;

      try {
        const newComment = {
          postId: id,
          author: values.author,
          content: values.content,
          createdAt: Timestamp.now(),
          isApproved: false,
        };

        await addDoc(collection(db, 'comments'), newComment);
        resetForm();
        alert('Comentário enviado com sucesso! Aguardando aprovação.');
      } catch (error) {
        console.error('Erro ao enviar comentário:', error);
        alert('Erro ao enviar comentário. Tente novamente.');
      }
    },
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = {
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate(),
            updatedAt: docSnap.data().updatedAt.toDate(),
          } as BlogPost;
          setPost(postData);

          // Buscar comentários aprovados
          const q = query(
            collection(db, 'comments'),
            where('postId', '==', id),
            where('isApproved', '==', true),
            orderBy('createdAt', 'desc')
          );
          const commentsSnapshot = await getDocs(q);
          const fetchedComments = commentsSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          })) as Comment[];
          setComments(fetchedComments);
        }
      } catch (error) {
        console.error('Erro ao buscar post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold">Post não encontrado</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 pt-32 px-6">
      <article className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-8">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
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
            <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
            <div className="prose max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </motion.div>

        {/* Seção de comentários */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Comentários</h2>

          {/* Formulário de comentário */}
          <form onSubmit={formik.handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="mb-4">
              <label htmlFor="author" className="block text-gray-700 font-medium mb-2">
                Nome
              </label>
              <input
                type="text"
                id="author"
                {...formik.getFieldProps('author')}
                className={`w-full px-4 py-2 rounded-lg border ${
                  formik.touched.author && formik.errors.author
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.author && formik.errors.author && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.author}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                Comentário
              </label>
              <textarea
                id="content"
                {...formik.getFieldProps('content')}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  formik.touched.content && formik.errors.content
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {formik.touched.content && formik.errors.content && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.content}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-black text-[#EAFD5C] px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              Enviar comentário
            </button>
          </form>

          {/* Lista de comentários */}
          <div className="space-y-6">
            {comments.map(comment => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">{comment.author}</h3>
                  <span className="text-sm text-gray-500">
                    {format(comment.createdAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default Post; 