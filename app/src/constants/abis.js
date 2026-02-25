// Adresse fictive pour la démo, à remplacer par l'adresse déployée du HPIVFactory
export const FACTORY_ADDRESS_LIVE = "0x0000000000000000000000000000000000000000";

// ABI pour vérifier le status Whitelist sur la Factory + Register
export const FACTORY_ABI_EXTENDED = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},
  {"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"insurer","type":"address"},{"indexed":false,"internalType":"bool","name":"status","type":"bool"}],"name":"InsurerStatusChanged","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"insurer","type":"address"},{"indexed":false,"internalType":"string","name":"companyName","type":"string"},{"indexed":false,"internalType":"string","name":"kybHash","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"RegistrationRequested","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"vaultAddress","type":"address"},{"indexed":true,"internalType":"address","name":"insurer","type":"address"},{"indexed":false,"internalType":"string","name":"riskName","type":"string"},{"indexed":false,"internalType":"uint256","name":"capTotal","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startDate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"maturityDate","type":"uint256"}],"name":"VaultCreated","type":"event"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allVaults","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"contract IERC20","name":"_asset","type":"address"},{"internalType":"address","name":"_compliance","type":"address"},{"internalType":"uint256","name":"_capTotal","type":"uint256"},{"internalType":"uint256","name":"_maxCoverage","type":"uint256"},{"internalType":"uint256","name":"_startDate","type":"uint256"},{"internalType":"uint256","name":"_maturityDate","type":"uint256"},{"internalType":"string","name":"_riskName","type":"string"},{"internalType":"string","name":"_description","type":"string"}],"name":"createVault","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"getAllVaults","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"getPendingRequests","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"_insurer","type":"address"}],"name":"getRequestDetails","outputs":[{"components":[{"internalType":"string","name":"companyName","type":"string"},{"internalType":"string","name":"kybHash","type":"string"},{"internalType":"enum HPIVFactory.RequestStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"requestDate","type":"uint256"}],"internalType":"struct HPIVFactory.InsurerRequest","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"insurerRequests","outputs":[{"internalType":"string","name":"companyName","type":"string"},{"internalType":"string","name":"kybHash","type":"string"},{"internalType":"enum HPIVFactory.RequestStatus","name":"status","type":"uint8"},{"internalType":"uint256","name":"requestDate","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isValidVault","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isWhitelistedInsurer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},
  {"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"pendingRequestAddresses","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"string","name":"_companyName","type":"string"},{"internalType":"string","name":"_kybHash","type":"string"}],"name":"registerInsurer","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"_insurer","type":"address"},{"internalType":"bool","name":"_status","type":"bool"}],"name":"setInsurerStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[],"name":"totalVaults","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}
];

// ABI Minimal pour lire les balances ERC20
export const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function approve(address spender, uint256 amount) external returns (bool)"
];

// Whitelist locale pour simulation
export const INSURER_WHITELIST_LOCAL = [
    '0x912f9886fb676750943fdefc4c30d3ca927c3a72',
    '0x5B757b308b8842698035C53b8ea0844240ac485B',
    '0xsimulated000000000000000000000000000000'
].map(addr => addr.toLowerCase());
