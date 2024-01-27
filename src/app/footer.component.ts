import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<footer class="footer" >
  <div class="footer-container" >
    <div class="footer-logo">
      <img src="./assets/tree.png" alt="Tree Logo" style="height: 100px;" class="footer_image">
    </div>
    <div class="footer-text">
      <p>We are dedicated to providing our customers with eco-friendly, organic, and consciousness-based medications.</p>
    </div>
    <div class="footer-social">
      <a href="https://www.facebook.com/msdmiu/"><i class="fab fa-facebook-f"></i></a>
      <a href="https://twitter.com/miu_msd/"><i class="fab fa-x"></i></a>
      <a href="https://www.instagram.com/miu.msd/?hl=en"><i class="fab fa-instagram"></i></a>
    </div>
    <div class="footer-address">
      <p>1000 N 4th St. </p>
      <p>Fairfield, Iowa 52557</p>
    </div>
  </div>
</footer>
  `,
  styles: [
  ]
})
export class FooterComponent {

}
