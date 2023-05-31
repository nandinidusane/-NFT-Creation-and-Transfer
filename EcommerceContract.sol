// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract EcommerceContract
{
    struct Product
    {
        uint256 id;         // unique id
        string name;        // name of product
        address owner;      // current owner
    }
    mapping(uint256 => Product) public products;   
    uint256 public productCount;                    
    event OwnershipTransferred(uint256 productId, address previousOwner, address newOwner);
    function createProduct(string memory _name) public
    {
        productCount++;                           
        products[productCount] = Product(productCount, _name, msg.sender);   
    }
    function transferOwnership(uint256 _productId, address _newOwner) public
    {
        require(products[_productId].owner == msg.sender, "You are not the owner of this product.");
        products[_productId].owner = _newOwner;     
        emit OwnershipTransferred(_productId, msg.sender, _newOwner);   
    }
    function getOwnedProducts(address _walletAddress) public view returns (uint256[] memory)
    {
        uint256[] memory ownedProductIds = new uint256[](productCount);
        uint256 ownedProductCount = 0;                                  
        for (uint256 i = 1; i <= productCount; i++)
        {
            if (products[i].owner == _walletAddress)
            {
                ownedProductIds[ownedProductCount] = products[i].id;     
                ownedProductCount++;                                    
            }
        }
        uint256[] memory ownedProducts = new uint256[](ownedProductCount);
        for (uint256 i = 0; i < ownedProductCount; i++)
        {
            ownedProducts[i] = ownedProductIds[i];                       
        }
        return ownedProducts;                                             
    }
}