// Importações necessárias
import { useState } from 'react'; // Hook do React para gerenciar estado local (email/senha, loading, etc.)
import { Link, useNavigate } from 'react-router-dom'; // Link para navegação declarativa e useNavigate para navegação programática
import { useAuth } from '../context/AuthContext'; // Contexto de autenticação (fornece login e dados do usuário)
import { mockApi } from '../services/mockApi'; // API simulada para validar login
import { Button } from '../components/Button'; // Componente de botão reutilizável
import { Input } from '../components/Input'; // Componente de input reutilizável
import { Card } from '../components/Card'; // Componente de card que organiza o layout
import toast from 'react-hot-toast'; // Biblioteca para exibir notificações de sucesso/erro

// Componente funcional Login
export const Login = () => {
    
  // Estado que guarda os dados do formulário (email e senha)
  const [formData, setFormData] = useState({ email: '', password: '' });
  // Estado que controla o carregamento (loading) ao enviar o formulário
  const [loading, setLoading] = useState(false);
  // Função de login vinda do contexto de autenticação
  const { login } = useAuth();
  // Hook para redirecionar o usuário após o login
  const navigate = useNavigate();

  // Função que trata o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setLoading(true); // Ativa estado de loading no botão

    try {
      // Faz chamada à API simulada para autenticação
      const { user, token } = await mockApi.login(formData.email, formData.password);
      // Salva usuário e token no contexto de autenticação
      login(user, token);
      // Exibe mensagem de sucesso
      toast.success('Login realizado com sucesso!');
      // Redireciona para o dashboard
      navigate('/dashboard');
    } catch (error) {
      // Exibe mensagem de erro caso as credenciais sejam inválidas
      toast.error(error.message);
    } finally {
      // Desativa o estado de loading independentemente do resultado
      setLoading(false);
    }
  }; 

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4"> {/* Centraliza o card */}
      {/* Card que contém o formulário de login */}
      <Card className="w-full max-w-md">
        {/* Cabeçalho com título e subtítulo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Entrar</h1>
          <p className="text-dark/70">Acesse sua conta no Lunysse</p>
        </div>

        {/* Formulário de login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de email */}
          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
            required
          />

          {/* Campo de senha */}
          <Input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Sua senha"
            required
          />

          {/* Botão de login */}
          <Button
            type="submit"
            loading={loading} // Mostra spinner quando loading = true
            className="w-full"
          >
            Entrar
          </Button>
        </form>

        {/* Links adicionais: criar conta e voltar ao início */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-dark/70">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-light hover:text-accent font-medium">
              Criar conta
            </Link>
          </p>
          <p className="text-dark/70">
            <Link to="/" className="text-light hover:text-accent font-medium">
              ← Voltar ao início
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};