import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, addDoc, updateDoc, doc, deleteDoc, where, DocumentData, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { BlogPost, BlogPostFormData, Comment } from '../../types/blog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MDEditor from '@uiw/react-md-editor';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Admin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pendingComments, setPendingComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'comments'>('posts');

  const formik = useFormik<BlogPostFormData>({
    initialValues: {
      title: '',
      content: '',
      excerpt: '',
      tags: [],
      coverImage: undefined,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Título é obrigatório'),
      content: Yup.string().required('Conteúdo é obrigatório'),
      excerpt: Yup.string().required('Resumo é obrigatório'),
      tags: Yup.array().of(Yup.string()).min(1, 'Adicione pelo menos uma tag'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        let coverImageUrl = '';
        
        if (values.coverImage) {
          const storageRef = ref(storage, `blog/${values.coverImage.name}`);
          await uploadBytes(storageRef, values.coverImage);
          coverImageUrl = await getDownloadURL(storageRef);
        }

        const newPost = {
          title: values.title,
          content: values.content,
          excerpt: values.excerpt,
          tags: values.tags,
          coverImage: coverImageUrl,
          author: 'Admin', // Você pode personalizar isso
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };

        await addDoc(collection(db, 'posts'), newPost);
        resetForm();
        fetchPosts();
        alert('Post criado com sucesso!');
      } catch (error) {
        console.error('Erro ao criar post:', error);
        alert('Erro ao criar post. Tente novamente.');
      }
    },
  });

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as BlogPost[];
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  };

  const fetchPendingComments = async () => {
    try {
      const q = query(
        collection(db, 'comments'),
        where('isApproved', '==', false),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedComments = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as Comment[];
      setPendingComments(fetchedComments);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchPosts(), fetchPendingComments()]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproveComment = async (commentId: string) => {
    try {
      const commentRef = doc(db, 'comments', commentId);
      await updateDoc(commentRef, { isApproved: true });
      fetchPendingComments();
    } catch (error) {
      console.error('Erro ao aprovar comentário:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este comentário?')) return;

    try {
      await deleteDoc(doc(db, 'comments', commentId));
      fetchPendingComments();
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este post?')) return;

    try {
      await deleteDoc(doc(db, 'posts', postId));
      fetchPosts();
    } catch (error) {
      console.error('Erro ao excluir post:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
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
          Administração do Blog
        </motion.h1>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1">
            <button
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'posts'
                  ? 'bg-black text-[#EAFD5C]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </button>
            <button
              className={`px-6 py-2 rounded-lg transition-colors ${
                activeTab === 'comments'
                  ? 'bg-black text-[#EAFD5C]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('comments')}
            >
              Comentários Pendentes
              {pendingComments.length > 0 && (
                <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  {pendingComments.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'posts' ? (
          <div className="space-y-8">
            {/* Formulário de criação de post */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-6">Criar Novo Post</h2>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    {...formik.getFieldProps('title')}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formik.touched.title && formik.errors.title
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-gray-700 font-medium mb-2">
                    Resumo
                  </label>
                  <textarea
                    id="excerpt"
                    {...formik.getFieldProps('excerpt')}
                    rows={3}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      formik.touched.excerpt && formik.errors.excerpt
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {formik.touched.excerpt && formik.errors.excerpt && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.excerpt}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Conteúdo (Markdown)
                  </label>
                  <MDEditor
                    value={formik.values.content}
                    onChange={(value) => formik.setFieldValue('content', value || '')}
                  />
                  {formik.touched.content && formik.errors.content && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.content}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    onChange={(e) => {
                      const tags = e.target.value.split(',').map((tag) => tag.trim());
                      formik.setFieldValue('tags', tags);
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  />
                  {formik.touched.tags && formik.errors.tags && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.tags}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="coverImage" className="block text-gray-700 font-medium mb-2">
                    Imagem de Capa
                  </label>
                  <input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        formik.setFieldValue('coverImage', file);
                      }
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-black text-[#EAFD5C] px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Criar Post
                </button>
              </form>
            </motion.div>

            {/* Lista de posts */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Posts Publicados</h2>
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Excluir
                    </button>
                  </div>
                  <p className="text-gray-600 mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
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
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Comentários Pendentes</h2>
            {pendingComments.length === 0 ? (
              <p className="text-center text-gray-500">Nenhum comentário pendente</p>
            ) : (
              pendingComments.map((comment) => (
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
                  <p className="text-gray-700 mb-4">{comment.content}</p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Recusar
                    </button>
                    <button
                      onClick={() => handleApproveComment(comment.id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Aprovar
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin; 