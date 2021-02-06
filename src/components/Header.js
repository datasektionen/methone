import React from 'react'

/**
 * Header component below the methone bar.
 * 
 * Saw this was implemented on some pages, why not create a reusable one.
 */
const Header = ({title = "", action = undefined, ...rest}) => {
    return (
        <header>
            <div className="header-inner">
            <div className="row">
                <div className="header-left col-md-2">
                    {/* One element to be inserted here. A link element <a> or <Link> if using React. */}
                    {rest.children}
                </div>
                <div className="col-md-8">
                <h2>{ title }</h2>
                </div>
                <div className="header-right col-md-2">
                    {/* Action button. Used on datasektionen.se to edit a page (takes you to github bawang-content)*/}
                    {action && <button className="primary-action" onClick={action.onClick}>{action.text}</button>}
                </div>
            </div>
            </div>
        </header>
    )
}

export default Header