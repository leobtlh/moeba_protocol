import { useState } from 'react';

// --- 1. CONTEXTES GLOBAUX ---
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Web3Provider } from './context/Web3Context';
import { DataProvider } from './context/DataContext';

// --- 2. LAYOUT ---
import MainLayout from './components/Layout/MainLayout';

// --- 3. PAGES ---
import MarketplacePage from './pages/MarketplacePage';
import PortfolioPage from './pages/PortfolioPage';
import InsurerDashboardPage from './pages/InsurerDashboardPage';
import VaultDetailsPage from './pages/VaultDetailsPage';

function App() {
  // --- STATE DE NAVIGATION ---
  const [activeView, setActiveView] = useState('marketplace'); // 'marketplace', 'portfolio', 'insurer', 'details'
  const [selectedVaultId, setSelectedVaultId] = useState(null);

  /**
   * Navigation vers les détails d'un Vault
   */
  const handleNavigateToVault = (vaultId) => {
    setSelectedVaultId(vaultId);
    setActiveView('details');
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <Web3Provider>
          <DataProvider>

            <MainLayout
              activeView={activeView}
              setActiveView={setActiveView}
            >
              {/* ROUTING MANUEL */}
              {activeView === 'marketplace' && (
                <MarketplacePage onVaultSelect={handleNavigateToVault} />
              )}

              {activeView === 'portfolio' && (
                <PortfolioPage onVaultSelect={handleNavigateToVault} />
              )}

              {activeView === 'insurer' && (
                <InsurerDashboardPage />
              )}

              {activeView === 'details' && selectedVaultId && (
                <VaultDetailsPage
                  vaultId={selectedVaultId}
                  onBack={() => setActiveView('marketplace')}
                />
              )}

            </MainLayout>

          </DataProvider>
        </Web3Provider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
