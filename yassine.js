document.addEventListener('DOMContentLoaded', function() {

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger) {
        burger.addEventListener('click', () => {

            nav.classList.toggle('active');
            

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            

            burger.classList.toggle('active');
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            

            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, 
                    behavior: 'smooth'
                });
                

                document.querySelectorAll('.nav-links a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });


    const sliders = {
        featured: {
            container: document.querySelector('.featured .slider-container'),
            prevBtn: document.querySelector('.featured .prev-btn'),
            nextBtn: document.querySelector('.featured .next-btn')
        },
        womens: {
            container: document.querySelector('.womens-slider .slider-container'),
            prevBtn: document.querySelector('.womens-slider .prev-btn'),
            nextBtn: document.querySelector('.womens-slider .next-btn')
        },
        mens: {
            container: document.querySelector('.mens-slider .slider-container'),
            prevBtn: document.querySelector('.mens-slider .prev-btn'),
            nextBtn: document.querySelector('.mens-slider .next-btn')
        }
    };


    function setupProductCardWidths() {

        const productCards = document.querySelectorAll('.product-card');
        let cardWidth;
        

        if (window.innerWidth > 1024) {
            cardWidth = '25%'; 
        } else if (window.innerWidth > 768) {
            cardWidth = '33.333%'; 
        } else if (window.innerWidth > 480) {
            cardWidth = '50%'; 
        } else {
            cardWidth = '100%'; 
        }
        

        productCards.forEach(card => {
            card.style.width = cardWidth;
            card.style.minWidth = cardWidth;
            card.style.flex = `0 0 ${cardWidth}`;
        });
    }
    

    setupProductCardWidths();
    

    window.addEventListener('resize', setupProductCardWidths);
    

    for (const key in sliders) {
        const slider = sliders[key];
        
        if (slider.container && slider.prevBtn && slider.nextBtn) {

            let position = 0;
            

            function updateButtonStates() {

                if (position <= 0) {
                    slider.prevBtn.disabled = true;
                    slider.prevBtn.classList.add('disabled');
                } else {
                    slider.prevBtn.disabled = false;
                    slider.prevBtn.classList.remove('disabled');
                }
                

                const containerWidth = slider.container.parentElement.offsetWidth;
                const scrollWidth = slider.container.scrollWidth;
                
                if (position >= scrollWidth - containerWidth) {
                    slider.nextBtn.disabled = true;
                    slider.nextBtn.classList.add('disabled');
                } else {
                    slider.nextBtn.disabled = false;
                    slider.nextBtn.classList.remove('disabled');
                }
            }
            

            updateButtonStates();
            

            slider.prevBtn.addEventListener('click', () => {
                const containerWidth = slider.container.parentElement.offsetWidth;

                position = Math.max(position - containerWidth, 0);
                slider.container.style.transform = `translateX(-${position}px)`;
                updateButtonStates();
            });
            

            slider.nextBtn.addEventListener('click', () => {
                const containerWidth = slider.container.parentElement.offsetWidth;
                const scrollWidth = slider.container.scrollWidth;

                position = Math.min(position + containerWidth, scrollWidth - containerWidth);
                slider.container.style.transform = `translateX(-${position}px)`;
                updateButtonStates();
            });
        }
    }


    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.closest('.category-section');
            const category = this.getAttribute('data-category');
            

            section.querySelectorAll('.category-btn').forEach(categoryBtn => {
                categoryBtn.classList.remove('active');
            });
            this.classList.add('active');
            

            const products = section.querySelectorAll('.product-card');
            
            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');
                if (category === 'all' || productCategory === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
            

            let sliderKey = 'featured';
            if (section.classList.contains('womens-slider')) {
                sliderKey = 'womens';
            } else if (section.classList.contains('mens-slider')) {
                sliderKey = 'mens';
            }
            
            const slider = sliders[sliderKey];
            if (slider && slider.container) {

                position = 0;
                slider.container.style.transform = 'translateX(0)';
                

                setTimeout(() => {

                    const containerWidth = slider.container.parentElement.offsetWidth;
                    const scrollWidth = slider.container.scrollWidth;
                    
                    if (slider.prevBtn) {
                        slider.prevBtn.disabled = true;
                        slider.prevBtn.classList.add('disabled');
                    }
                    
                    if (slider.nextBtn) {
                        slider.nextBtn.disabled = (scrollWidth <= containerWidth);
                        if (scrollWidth <= containerWidth) {
                            slider.nextBtn.classList.add('disabled');
                        } else {
                            slider.nextBtn.classList.remove('disabled');
                        }
                    }
                }, 50);
            }
        });
    });


    const testimonialSlider = {
        container: document.querySelector('.testimonial-slider'),
        prevBtn: document.querySelector('.testimonials .prev-btn'),
        nextBtn: document.querySelector('.testimonials .next-btn'),
        testimonials: document.querySelectorAll('.testimonial'),
        currentIndex: 0
    };
    
    if (testimonialSlider.container && testimonialSlider.testimonials.length > 0) {

        testimonialSlider.testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        

        if (testimonialSlider.prevBtn && testimonialSlider.nextBtn) {
            testimonialSlider.prevBtn.addEventListener('click', () => {
                testimonialSlider.testimonials[testimonialSlider.currentIndex].style.display = 'none';
                testimonialSlider.currentIndex = 
                    (testimonialSlider.currentIndex - 1 + testimonialSlider.testimonials.length) % 
                    testimonialSlider.testimonials.length;
                testimonialSlider.testimonials[testimonialSlider.currentIndex].style.display = 'block';
            });
            
            testimonialSlider.nextBtn.addEventListener('click', () => {
                testimonialSlider.testimonials[testimonialSlider.currentIndex].style.display = 'none';
                testimonialSlider.currentIndex = 
                    (testimonialSlider.currentIndex + 1) % testimonialSlider.testimonials.length;
                testimonialSlider.testimonials[testimonialSlider.currentIndex].style.display = 'block';
            });
        }
    }


    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100; 
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === `#${sectionId}`) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    

    highlightNavOnScroll();


    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value) {

                alert(`Thank you for subscribing with ${emailInput.value}! You'll receive updates on our latest collections and exclusive offers.`);
                emailInput.value = '';
            }
        });
    }


    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '1rem 5%';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1.5rem 5%';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});