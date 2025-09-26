import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import toast from 'react-hot-toast';
 
export const Register = () => {
  const [userType, setUserType] = useState('paciente');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    crm: '',
    specialty: '',
    phone: '',
    birthDate: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (formData.password !== formData.confirmPassword) {
      toast.error('Senhas não coincidem');
      return;
    }
 
    setLoading(true);
   
    try {
      const { user, token } = await mockApi.register({
        ...formData,
        type: userType
      });
      login(user, token);
      toast.success('Conta criada com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Criar Conta</h1>
          <p className="text-dark/70">Cadastre-se na lunysse</p>
        </div>
 
        {/* User Type Selector */}
        <div className="flex mb-6 bg-white/10 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setUserType('paciente')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              userType === 'paciente'
                ? 'bg-light text-white'
                : 'text-dark hover:text-light'
            }`}
          >
            Paciente
          </button>
          <button
            type="button"
            onClick={() => setUserType('psicologo')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              userType === 'psicologo'
                ? 'bg-light text-white'
                : 'text-dark hover:text-light'
            }`}
          >
            Psicólogo
          </button>
        </div>
 
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Seu nome completo"
            required
          />
 
          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
            required
          />
 
          <Input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Sua senha"
            required
          />
 
          <Input
            label="Confirmar senha"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            placeholder="Confirme sua senha"
            required
          />
 
          {/* Campos específicos para psicólogo */}
          {userType === 'psicologo' && (
            <>
              <Input
                label="CRM"
                value={formData.crm}
                onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                placeholder="Ex: CRP 12/34567"
                required
              />
 
              <Input
                label="Especialidade"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                placeholder="Ex: Psicologia Clínica, Terapia Cognitiva"
                required
              />
 
              <Input
                label="Telefone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 99999-9999"
                required
              />
            </>
          )}
 
          {/* Campos específicos para paciente */}
          {userType === 'paciente' && (
            <>
              <Input
                label="Telefone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(11) 99999-9999"
                required
              />
 
              <Input
                label="Data de nascimento"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                required
              />
            </>
          )}
 
          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Cadastrar
          </Button>
        </form>
 
        <div className="mt-6 text-center space-y-2">
          <p className="text-dark/70">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-light hover:text-accent font-medium">
              Fazer login
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
 