/**
 * TokenDemo component
 * 
 * Demonstrates the consumption of design tokens through CSS variables.
 * This example shows how semantic tokens flow from JSON to CSS to UI.
 */

import './TokenDemo.css';

export const TokenDemo = () => {
  return (
    <div className="token-demo">
      <div className="token-demo__container">
        {/* Surface Card */}
        <div className="token-demo__card">
          <h2 className="token-demo__title">
            Design Tokens Demo
          </h2>
          <p className="token-demo__body">
            Ce composant démontre l&apos;utilisation des tokens sémantiques MDS.
            Toutes les couleurs, espacements et typographies proviennent de
            variables CSS générées depuis les fichiers JSON.
          </p>
          <p className="token-demo__caption">
            Aucune valeur magique • 100% tokens
          </p>
          
          {/* Actions */}
          <div className="token-demo__actions">
            <button className="token-demo__button token-demo__button--primary">
              Action Primary
            </button>
            <button className="token-demo__button token-demo__button--secondary">
              Action Secondary
            </button>
            <button className="token-demo__button token-demo__button--ghost">
              Action Ghost
            </button>
          </div>
        </div>

        {/* Token Reference */}
        <div className="token-demo__reference">
          <h3 className="token-demo__reference-title">
            Tokens utilisés
          </h3>
          <dl className="token-demo__reference-list">
            <dt>Surface</dt>
            <dd><code>--color-neutral-surface-soft</code></dd>
            
            <dt>Title</dt>
            <dd><code>--color-neutral-content-heavy</code></dd>
            
            <dt>Body</dt>
            <dd><code>--color-neutral-content-default</code></dd>
            
            <dt>Caption</dt>
            <dd><code>--color-neutral-content-weak</code></dd>
            
            <dt>Spacing</dt>
            <dd>
              <code>--spacing-inset-lg</code>,
              <code>--spacing-stack-md</code>
            </dd>
            
            <dt>Border radius</dt>
            <dd><code>--radius-md</code></dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

