const { NotImplementedError } = require("../lib");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }
  root() {
    return this.treeRoot;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.treeRoot === null) {
      this.treeRoot = newNode;
      return;
    }
    let current = this.treeRoot;
    while (true) {
      if (data === current.data) {
        return;
      }
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  find(data) {
    let current = this.treeRoot;
    while (current) {
      if (data === current.data) return current;
      else if (data < current.data) current = current.left;
      else if (data > current.data) current = current.right;
    }
    return null;
  }

  has(data) {
    let current = this.treeRoot;
    while (current) {
      if (data === current.data) return true;
      else if (data < current.data) current = current.left;
      else if (data > current.data) current = current.right;
    }
    return false;
  }

  remove(data) {
    this.treeRoot = removeNode(this.treeRoot, data);
    function removeNode(node, data) {
      if (!node) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
      } else {
        if (!node.left && !node.right) return null;
        if (!node.left) return node.right;
        if (!node.right) return node.left;
        let minFormRight = node.right;
        while (minFormRight.left) {
          minFormRight = minFormRight.left;
        }
        node.data = minFormRight.data;
        node.right = removeNode(node.right, minFormRight.data);
      }
      return node;
    }
  }

  min() {
    if (!this.treeRoot) return null;
    let current = this.treeRoot;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.treeRoot) return null;
    let current = this.treeRoot;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
