export function menuTrigger(){
  const $body = document.body;
  const $menuTrigger = document.querySelector('.js-menu-trigger');

  if ( typeof $menuTrigger !== 'undefined' ) {
    $menuTrigger.addEventListener('click', function() {
      if( $body.classList.contains('on') ){
        $body.classList.remove('on');
      } else {
        $body.classList.add('on');
      }
    });
  }
}

menuTrigger()
