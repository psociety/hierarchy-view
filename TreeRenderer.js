class TreeRenderer {
  /**
   * @param {Array<Object>} data - Hierarchical array: { name: string, childs: Array }
   * @param {HTMLElement|string} container - DOM element or selector for mounting
   */
  constructor(data, container) {
    this.data = data;
    this.container =
      typeof container === 'string'
        ? document.querySelector(container)
        : container;
    if (!this.container) {
      throw new Error('Container element not found');
    }
  }

  render() {
    this.container.innerHTML = '';
    // outer wrapper
    const root = document.createElement('div');
    root.className = 'hv-container';
    const wrapper = document.createElement('div');
    wrapper.className = 'hv-wrapper';
    root.appendChild(wrapper);

    this._renderItems(this.data, wrapper);

    this.container.appendChild(root);
  }

  _renderItems(items, parentEl) {
    items.forEach(item => {
      const itemEl = this._renderItem(item);
      parentEl.appendChild(itemEl);
    });
  }

  _renderItem(node) {
    const itemWrap = document.createElement('div');
    itemWrap.className = 'hv-item';

    // parent label
    const parentDiv = document.createElement('div');
    parentDiv.className = 'hv-item-parent';
    const p = document.createElement('p');
    p.className = 'simple-card';
    p.textContent = node.name;
    parentDiv.appendChild(p);
    itemWrap.appendChild(parentDiv);

    if (Array.isArray(node.childs) && node.childs.length) {
      const childrenDiv = document.createElement('div');
      childrenDiv.className = 'hv-item-children';

      node.childs.forEach(childGroup => {
        childGroup.forEach(childNode => {
          const childWrapper = document.createElement('div');
          childWrapper.className = 'hv-item-child';

          // if the child has its own children, recurse
          if (Array.isArray(childNode.childs) && childNode.childs.length) {
            childWrapper.appendChild(this._renderItem(childNode));
          } else {
            const leafP = document.createElement('p');
            leafP.className = 'simple-card';
            leafP.textContent = childNode.name;
            childWrapper.appendChild(leafP);
          }

          childrenDiv.appendChild(childWrapper);
        });
      });

      itemWrap.appendChild(childrenDiv);
    }

    return itemWrap;
  }
}
