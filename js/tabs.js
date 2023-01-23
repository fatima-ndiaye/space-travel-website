const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus );
tabs.forEach((tab) => 
{
    tab.addEventListener('click', changeTabPanel)

});


let tabFocus = 0;
function changeTabFocus (e)
{
    const keydownLeft = 37;
    const keydownRight = 39;

    // change the tabindex of the current tab to -1
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) 
    {
        tabs[tabFocus].setAttribute("tabindex", -1); //give the first button (tabs[0]) a tabindex of -1

        // if the right key is pushed, move to the next tab on the right
        if (e.keyCode === keydownRight) {
            console.log(tabs.length)
            tabFocus++; //tabFocus = tabFocus + 1;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;

            }
        }
         // if the left key is pushed, move to the next tab on the left
        else if (e.keyCode === keydownLeft) {
            tabFocus--; //tabFocus = tabFocus - 1;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();        
    }



}

function changeTabPanel (e)
{
    const targetTab = e.target; 
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode; //the entire tablist
    const mainContainer = tabContainer.parentNode; //to select the main

    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true);

    //to change the articles
    hideContent(mainContainer, '[role = "tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);//turning one the one article we wanted

    //to change the images
    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`])

}

function hideContent (parent, content)
{
    parent
        .querySelectorAll(content)
        .forEach((item) => { item.setAttribute('hidden', true); });// to hide every article

}

function showContent (parent, content)
{
    parent.querySelector(content).removeAttribute('hidden');

}














/* changeTabPanel () Before refactoring 
function changeTabPanel (e)
{
    const targetTab = e.target; 
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode; //the entire tablist
    const mainContainer = tabContainer.parentNode; //to select the main

    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true);

    //to change the articles
    mainContainer.querySelectorAll('[role="tabpanel"]').forEach((panel) => // to hide every article
    {
        panel.setAttribute('hidden', true);
    });
    mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden'); //turning one the one article we wanted

    //to change the images
    mainContainer.querySelectorAll('picture').forEach((picture) => 
    {
        picture.setAttribute('hidden', true)

    });
    mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');

}
*/