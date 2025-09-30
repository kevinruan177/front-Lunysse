
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import toast from 'react-hot-toast';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, token } = await mockApi.login(formData.email, formData.password);
      login(user, token);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Coluna esquerda - Formulário */}
      <div className="w-1/2 bg-[#EAF8FC] flex flex-col justify-center items-center px-12">
        <h2 className="text-3xl font-bold mb-8">LOGIN</h2>
        
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Senha"
            type="text"
            value={formData.password} // <-- se for "senha", mantenha password; se for "nome", troque o state
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <div className="flex items-center justify-between">
            <Link to="/register" className="text-sm text-blue-700">
              criar uma conta
            </Link>
          </div>

          <Button type="submit" loading={loading} className="w-full">
            ENTRAR
          </Button>
        </form>
      </div>

      {/* Coluna direita - Mensagem de boas-vindas */}
      <div className="w-1/2 bg-[#134B89] text-white flex justify-center items-center p-12 clip-path-diagonal">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4">BEM VINDO<br/>DE VOLTA</h1>
          <p className="text-lg">
            O seu serviço de agendamentos de psicanálise favorito
          </p>
        </div>
      </div>
    </div>
  );
};

