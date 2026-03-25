import { useState } from 'react';

// --- 1. CONTEXTES GLOBAUX ---
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { Web3Provider } from './context/Web3Context';
import { DataProvider } from './context/DataContext';

// --- 2. LAYOUT & MODALS ---
import MainLayout from './components/Layout/MainLayout';
import AcademyModal from './components/Modals/AcademyModal';

// --- 3. PAGES ---
import MarketplacePage from './pages/MarketplacePage';
import PortfolioPage from './pages/PortfolioPage';
import SponsorDashboardPage from './pages/SponsorDashboardPage';
import VaultDetailsPage from './pages/VaultDetailsPage';

function App() {
  // --- STATE DE NAVIGATION & THEMES (Remonté depuis la Navbar) ---
  const [activeView, setActiveView] = useState('marketplace');
  const [selectedVaultId, setSelectedVaultId] = useState(null);

  const [activeTheme, setActiveTheme] = useState('climate');
  const [isLearnMode, setIsLearnMode] = useState(false);

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
              activeTheme={activeTheme}
              setActiveTheme={setActiveTheme}
              isLearnMode={isLearnMode}
              setIsLearnMode={setIsLearnMode}
            >
              {/* ROUTING MANUEL */}
              {activeView === 'marketplace' && (
                <MarketplacePage
                  activeTheme={activeTheme}
                  onVaultSelect={handleNavigateToVault}
                />
              )}

              {activeView === 'portfolio' && (
                <PortfolioPage onVaultSelect={handleNavigateToVault} />
              )}

              {activeView === 'sponsor' && (
                <SponsorDashboardPage activeTheme={activeTheme} />
              )}

              {activeView === 'details' && selectedVaultId && (
                <VaultDetailsPage
                  vaultId={selectedVaultId}
                  onBack={() => setActiveView('marketplace')}
                />
              )}
            </MainLayout>

            {/* POP-UP ACADEMY EN SURIMPRESSION */}
            <AcademyModal
              isOpen={isLearnMode}
              onClose={() => {
                setIsLearnMode(false);
                setActiveView('marketplace');
              }}
              activeTheme={activeTheme}
            />

          </DataProvider>
        </Web3Provider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
