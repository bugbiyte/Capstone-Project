(function () {
  const modal = document.getElementById('card-modal');
  if (!modal) return;

  const titleElement = document.getElementById('card-modal-title');
  const descriptionElement = document.getElementById('card-modal-description');
  const closeButton = modal.querySelector('.card-modal__close');
  let lastFocusedElement = null;

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocusedElement) {
      lastFocusedElement.focus({ preventScroll: true });
      lastFocusedElement = null;
    }
  };

  const openModal = (title, description) => {
    lastFocusedElement = document.activeElement;
    titleElement.textContent = title || 'Madlib Title';
    descriptionElement.textContent = description || 'Swap this with your own content.';
    modal.classList.remove('hidden');
    modal.removeAttribute('aria-hidden');
    closeButton.focus({ preventScroll: true });
  };

  document.querySelectorAll('.recipe').forEach((card) => {
    card.addEventListener('click', () => {
      const { title, description } = card.dataset;
      openModal(title, description);
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        card.click();
      }
    });
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  closeButton.addEventListener('click', closeModal);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
})();
