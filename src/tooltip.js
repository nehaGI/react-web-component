class Tooltip extends HTMLElement {
  constructor() {
    super();
    this.tooltipContainer;
    this.text = 'default text';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <style>
    span {
      background-color: orange;
      position: absolute;
      z-index: 10;
    }
    </style>
    <slot>some default</slot><div>?</div>
    `;
  }

  connectedCallback() {
    let qmark = this.shadowRoot.querySelector('div');
    qmark.addEventListener('mouseover', this.showTooltip.bind(this));
    qmark.addEventListener('mouseout', this.hideTooltip.bind(this));
    this.shadowRoot.appendChild(qmark);
    this.style.position = 'relative';

    if (this.hasAttribute('text')) {
      this.text = this.getAttribute('text');
    }
  }
  //to show tooltip
  showTooltip() {
    this.tooltipContainer = document.createElement('span');
    this.tooltipContainer.textContent = this.text;
    this.shadowRoot.appendChild(this.tooltipContainer);
  }
  //to hide tooltip
  hideTooltip() {
    this.shadowRoot.removeChild(this.tooltipContainer);
  }
}
customElements.define('ruf-tooltip', Tooltip);
