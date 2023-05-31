window.addEventListener('DOMContentLoaded', function()
{
    if (typeof window.ethereum !== 'undefined')
    {
      web3 = new Web3(window.ethereum);
      console.log('MetaMask is installed!');
    }
    else
    {
      console.log('Please install MetaMask to interact with this application.');
      return;
    }

    window.ethereum.enable().then(function(accounts)
    {
      console.log('Connected to MetaMask:', accounts);
    }).catch(function(error) {
      console.error('Error connecting to MetaMask:', error);
    });
  
    const contractABI =
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "productId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "createProduct",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_walletAddress",
                    "type": "address"
                }
            ],
            "name": "getOwnedProducts",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "productCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "products",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_productId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const contractAddress = '0xeAB481d0D2b561750cfD9B9B2379d1045C34EBD4';
    const ecommerceContract = new web3.eth.Contract(contractABI, contractAddress);
  
    async function createProduct()
    {
      const productName = document.getElementById('product-name').value;
  
      try
      {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const result = await ecommerceContract.methods.createProduct(productName).send({ from: accounts[0] });
        console.log('Product Created:', result);
        document.getElementById('output').textContent = 'Product Created';
      } catch (error) {
        console.error('Error Creating Product:', error);
        document.getElementById('output').textContent = 'Error Creating Product.';
      }
    }
  
    async function transferOwnership()
    {
      const productId = document.getElementById('product-id').value;
      const newOwner = document.getElementById('new-owner').value;
  
      try
      {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const result = await ecommerceContract.methods.transferOwnership(productId, newOwner).send({ from: accounts[0] });
        console.log('Ownership Transferred:', result);
        document.getElementById('output').textContent = 'Ownership Transferred';
      }
      catch (error)
      {
        console.error('Error Transferring Ownership:', error);
        document.getElementById('output').textContent = 'Error Transferring Ownership.';
      }
    }
  
    async function getOwnedProducts()
    {
      const walletAddress = document.getElementById('wallet-address').value;
  
      try
      {
        const result = await ecommerceContract.methods.getOwnedProducts(walletAddress).call();
        console.log('Owned Products:', result);
        document.getElementById('output').textContent = `Owned Products: ${result}`;
      } catch (error)
      {
        console.error('Error Retrieving Owned Products:', error);
        document.getElementById('output').textContent = 'Error Retrieving Owned Products:';
      }
    }
  
    window.createProduct = createProduct;
    window.transferOwnership = transferOwnership;
    window.getOwnedProducts = getOwnedProducts;
  });
  