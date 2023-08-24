// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MyDrive {
    struct User {
        address userAddress;
        bool access;
    }
    //below mapping controls access of files of one user to other user
    mapping(address => User[]) public userToUserAccess;

    //below mapping stores all file urls for given person
    mapping(address => string[]) userToImages;

    //below mapping controls ownership of image gallery of one user to another
    mapping(address => mapping(address => bool)) ownership;

    mapping(address => mapping(address => bool)) prevData;

    function addFile(address _user, string memory fileURL) external {
        userToImages[_user].push(fileURL);
    }

    function addAccess(address _newAllowee) external {
        //msg.sender will the be person whose account access will be extended to the new allowee
        ownership[msg.sender][_newAllowee] = true;
        //modify existing User in User[] if user already present
        if (prevData[msg.sender][_newAllowee] == true) {
            for (uint i = 0; i < userToUserAccess[msg.sender].length; i++) {
                if (
                    _newAllowee == userToUserAccess[msg.sender][i].userAddress
                ) {
                    userToUserAccess[msg.sender][i].access = true;
                }
            }
        } else {
            userToUserAccess[msg.sender].push(User(_newAllowee, true));
            prevData[msg.sender][_newAllowee] = true;
        }
    }

    function revokeAccess(address _removeAllowee) external {
        //msg.sender will the be person whose account access will be extended to the new allowee
        ownership[msg.sender][_removeAllowee] = false;
        //you cannot remove access from a user for given drive, if he already didn't have it
        for (uint i = 0; i < userToUserAccess[msg.sender].length; i++) {
            if (userToUserAccess[msg.sender][i].userAddress == _removeAllowee) {
                userToUserAccess[msg.sender][i].access = false;
            }
        }
    }

    function getImages(address _user) external view returns (string[] memory) {
        //first check whether sender has access to users files
        require(
            msg.sender == _user || ownership[_user][msg.sender] == true,
            "You dont have access to requested address images"
        );
        return userToImages[_user];
    }

    function getSharedOwners() external view returns (User[] memory) {
        return userToUserAccess[msg.sender];
    }
}
