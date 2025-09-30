import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
} from 'lucide-react';

export const Relatorios = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState(null);

  useEffect(() => {
    const loadReportsData = async () => {
      try {
        const data = await mockApi.getReportsData(user.id);
        setReportsData(data);
      } catch (error) {
        console.error('Erro ao carregar dados dos relatórios:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReportsData();
  }, [user.id]);

  if (loading) return <LoadingSpinner size="lg" />;
  if (!reportsData) return <div>Erro ao carregar dados</div>;

  const { stats, frequencyData, statusData, riskAlerts, patientsData } = reportsData;
  const hasNoData = stats.activePatients === 0 && stats.totalSessions === 0;

  const barColors = [
    '#AEE3F8', '#7CC6F3', '#5EB3EA', '#349EDC',
    '#1D8FCC', '#0C7BB8', '#066CA1', '#045B88', '#024A70'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-dark mb-2">Relatórios e Analytics</h1>
        <p className="text-dark/70">Acompanhe métricas e indicadores da sua prática</p>
      </div>

      {hasNoData ? (
        <Card className="text-center py-12 border-2 border-dashed border-light/30">
          <BarChart3 className="w-16 h-16 text-light/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark mb-2">Relatórios em Construção</h3>
          <p className="text-dark/70 mb-4">
            Seus relatórios e analytics aparecerão aqui conforme você atender pacientes e realizar sessões.
          </p>
          <p className="text-sm text-dark/50">
            Comece aceitando solicitações de pacientes para gerar dados estatísticos.
          </p>
        </Card>
      ) : (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center bg-[#2493BF] text-white rounded-xl p-6 shadow">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-3xl font-bold">{stats.activePatients}</h3>
              <p className="text-sm uppercase tracking-wide">Pacientes Ativos</p>
            </Card>

            <Card className="text-center bg-[#2493BF] text-white rounded-xl p-6 shadow">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-3xl font-bold">{stats.totalSessions}</h3>
              <p className="text-sm uppercase tracking-wide">Total de Sessões</p>
            </Card>

            <Card className="text-center bg-[#2493BF] text-white rounded-xl p-6 shadow">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-3xl font-bold">{stats.attendanceRate}%</h3>
              <p className="text-sm uppercase tracking-wide">Taxa de Conclusão</p>
            </Card>

            <Card className="text-center bg-[#2493BF] text-white rounded-xl p-6 shadow">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
              <h3 className="text-3xl font-bold">{stats.riskAlerts}</h3>
              <p className="text-sm uppercase tracking-wide">Alertas de Risco</p>
            </Card>
          </div>

          {/* Gráficos e Alertas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Gráfico de Frequência */}
            <Card className="p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-dark mb-4">Frequência de Sessões</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={frequencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions">
                    {frequencyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Alertas de Risco */}
            <Card className="p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold text-dark mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Alerta de Risco
              </h2>
              <div className="space-y-3">
                {riskAlerts.length === 0 ? (
                  <p className="text-dark/70 text-center py-4">Nenhum alerta de risco no momento</p>
                ) : (
                  riskAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex justify-between items-center p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="text-red-500 w-5 h-5" />
                        <div>
                          <p className="font-semibold text-dark">{alert.patient}</p>
                          <p className="text-sm text-dark/60">{alert.reason}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            alert.risk === 'Alto'
                              ? 'bg-red-200 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          Risco {alert.risk}
                        </span>
                        <p className="text-xs text-dark/50 mt-1">
                          {new Date(alert.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
