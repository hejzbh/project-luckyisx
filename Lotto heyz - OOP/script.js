'use strict';

// H T M L  Elements

const ballsContainer = document.querySelector('.balls__container');
const balls = document.querySelectorAll('.ball');

const introSection = document.querySelector('.intro__section');
const loopSection = document.querySelector('.loop__section');
const loopBallsDivs = document.querySelectorAll('.kolo__ball');
const ballPlace = document.querySelectorAll('.ball_place');
const infoBalls = document.querySelector('.selected__balls');
const displayBall = document.querySelector('.display__ball');

const FormPopup = document.querySelector('.popup');

const submitName = document.querySelector('.nameSubmit');
const textName = document.querySelectorAll('.name');

const navLinks = document.querySelectorAll('.nav__link');

const popSec = document.querySelectorAll('.popSec');

const scoreText = document.querySelector('.pogodeneLoptice');
const balanceText = document.querySelector('.balance');
const resetText = document.querySelector('.reset__content');

// Buttons
const btnStart = document.querySelector('.start');
const redBtn = document.querySelector('.red__all');
const greenBtn = document.querySelector('.green__all');
const blueBtn = document.querySelector('.blue__all');
const purpleBtn = document.querySelector('.purple__all');
const yellowBtn = document.querySelector('.yellow__all');
const orangeBtn = document.querySelector('.orange__all');
const blackBtn = document.querySelector('.black__all');
const backBtn = document.querySelector('.back');

// Inputs
const inputPayment = document.querySelector('.payment__input');
const nameInput = document.querySelector('.insertName');


// Nodelist -> array
const javaScriptBalls = [...balls];
const ballsDivs = [...loopBallsDivs];

//IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
//IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII


class Application {
    locale = navigator.language; 

    allNumbers = [];      // Svi brojevi koje mozemo odabrati
    _maxBalls = 6;        // Maximalan broj odabranih brojeva, ne zove se dzaba lucky six :)
    pickedBalls = [];     // Loptice koje odaberemo
    obtainedNumbers = []; // Naše loptice koje su prikazane u kolu
    _ukupno = 0;          // ukupno++ svaki put kad odaberemo novu lopticu

    _scoreOfCarrer = 0; // Score kroz igru na duzi period (nebitno);

    #balance = 100; // Pocetni balance 100$



    constructor(name){
    this.name=name;
    this.getLocaleStorage();

    this.sortAllNumbers();
    this.starter();
    ballsContainer.addEventListener('click', this._pickBall.bind(this));
    navLinks.forEach(el => el.addEventListener('click', this.infoPopup.bind(this)));

    
redBtn.addEventListener('click', this.pickBallBtn.bind(this, '.red__ball'));
greenBtn.addEventListener('click', this.pickBallBtn.bind(this, '.green__ball'));
blueBtn.addEventListener('click', this.pickBallBtn.bind(this, '.blue__ball'));
purpleBtn.addEventListener('click', this.pickBallBtn.bind(this, '.purple__ball'));
yellowBtn.addEventListener('click', this.pickBallBtn.bind(this, '.yellow__ball'));
orangeBtn.addEventListener('click', this.pickBallBtn.bind(this, '.orange__ball'));
blackBtn.addEventListener('click', this.pickBallBtn.bind(this, '.black__ball'));

    }
   
    get getBalance(){
        return this.#balance;
    }

    set setBalance(value){
        this.#balance +=value;
    }



     // <<<<<<<< METODA #1 >>>>>>>>
     // Za objašnjenje metode ctrl + f, u polje upišite metoda.#brojMetode

    sortAllNumbers(){
        balls.forEach(ball => {
            const ballNumber = +ball.innerHTML;
        
            this.allNumbers.push(ballNumber);
        });

        this.allNumbers.sort((a,b) => a-b); // sortiramo taj array



    }


       // <<<<<<<< METODA #2 >>>>>>>>
       // Za objašnjenje metode ctrl + f, u polje upišite metoda.#brojMetode

       starter(){
         let nick = this.name[0].toUpperCase() + this.name.slice(1).toLowerCase();
         this.name = nick;

         // Set nick in dom manipulation
         textName.forEach(name =>{
            name.textContent = this.name.split(' ').join('');
         }) // Bez razmaka ime

         FormPopup.classList.add('hidden');
         introSection.classList.toggle('hidden');
         document.querySelector('.nav__links').classList.remove('hidden');
       }





    // <<<<<<<< METODA #3 >>>>>>>>
    // Za objašnje metode ctrl + f, u polje upišite metoda.#brojMetode

    _pickBall(e){
        const ball = e.target.closest('.ball'); // Target je ball div, odnosno broj (loptica);
        const ballNumber = +ball.innerHTML;     // Izvlacimo broj iz tog diva, pretvaramo ga u number
        
        if(!ball) return; // Ako user nije kliknuo na ball returnaj, ne nastavljaj.

        if(!this.pickedBalls.includes(ballNumber)){ //Ovo radimo kako ne bi mogli istu lopticu dva puta izabrati
            if(this._ukupno<this._maxBalls){ //Sve dok this.ukupno nije === this._maxBalls, redaj loptice
                this._ukupno++;
                this.pickedBalls.push(ballNumber);
                ball.style.opacity = '0.5';
                this.selectBallsDiv(this.pickedBalls);
            
            } else {  //Kada je ukupno===maxBalls, idemo dalje, blizi se pocetak igre
                this.startBtnFunctionality();
                setTimeout(() => {
                    alert('Sada mozete zapoceti igru');
                }, 100); //Posto alert ima prednost i uvijek ce se prvi prikazati, stavili smo mu timeout
            }
        } 
        
       }



    // <<<<<<<< METODA #4 >>>>>>>>
    // Za objašnje metode ctrl + f, u polje upišite metoda.#brojMetode

       startBtnFunctionality(){
    // Brisemo stari
    btnStart.style.background = 'none';
    // Stavljamo novi
    btnStart.classList.add('startBtnStyle');

    btnStart.addEventListener('click', this._accesStart.bind(this)); // Omogucavamo buttonu da pokrene igru
    }



    // <<<<<<<< METODA #5 >>>>>>>>
    // Za objašnje metode ctrl + f, u polje upišite metoda.#brojMetode

       _accesStart(){
     const payValue = +inputPayment.value; // Uzima value od inputa i pretvara ga u broj

     if(inputPayment.value && payValue>0 && this.getBalance > payValue){
         this.setBalance = -payValue;
         this.setLocalStorage();
         this.unStyleBalls();
         introSection.classList.toggle('hidden');
         loopSection.classList.toggle('hidden');
         this._startLoop(); // Ako su uslovi ifa ispunjeni pokrece kolo, odnosno startLoop metodu
     }
    }



    // <<<<<<<< METODA #6 >>>>>>>>

    _startLoop(){
        let loopedNumbers = []; // Brojevi koji su prikazani u kolu

        let i=0; // Pocetna loptica

    

        // Njegova jedina svrha jeste length, koji ce izmjenom također azurirati
        // igru u javaScript, napravio sam da sto vise bude automatizovano, array kao array nije bitan.
        const numbersLenght = Array.from({length: 28}, () => Math.floor(Math.random() * this.allNumbers.length)+1);
        
        // Ovo su brojevi koji se koriste u igri, odnosno brojevi koji se prikazuju u kolu
        let gameNumbers = this.generateNum(numbersLenght);
        
        
        // Koristimo arrow funkciju kako bi mogli pristupiti properties od objekta, jer arrow nema svoj this.
        // Nije nužno, možemo unutar parent funkcije deklarisati this key i onda ka koristiti u child funkciji
        // ali ovako je lakse za razumjeti kod

        const kolo = () => {
            loopedNumbers.push(gameNumbers[i]);

            if(this.pickedBalls.includes(gameNumbers[i])) {
                this.obtainedNumbers.push(gameNumbers[i]);
                this.markCorrectNum(gameNumbers[i]);
                this._scoreOfCarrer++;
            }  
        
            displayBall.classList.remove('hidden');
        

            // Uzimamo div koji ima broj loptice u innerHTML
            const divWithGameNumber = javaScriptBalls.find(div => div.innerHTML===gameNumbers[i] + ''); 
        
        
            // ↕↕↕
            // Od tog diva uzimamo style, konkretno background. To radimo kako bi znali
            // Koji background loptici u kolu da stavimo, jer svaka loptica ima svoju boju (crvene,zute,zelene itd...)

            const divStyle = window.getComputedStyle(divWithGameNumber);
            const bg = divStyle.getPropertyValue('background');
        
        
            // Kolo - prikazivanje loptice u kolu
            displayBall.innerHTML = gameNumbers[i];
            displayBall.style.background = bg;
        
            // Remove after
            ballsDivs[i].classList.add('removePseudo');
        
            const html = `${gameNumbers[i]}`;
        
        setTimeout(() => {
        
                 // Add before
                ballsDivs[i-1].classList.add('addPseudo');
                
               // Postavi innerHTML trenutni broj
               // ballsDivs[i-1].innerHTML = gameNumbers[i-1];
               ballsDivs[i-1].insertAdjacentHTML('afterbegin', html);
            
                // Postavi tom divu background od loptice/broja
                ballsDivs[i-1].style.background = bg;
        
                // Morao sam [i-1] zbog toga sto je timeout funkcija i onda ce uvijek kasniti,
                // a ispod imamo i++, sto ce se ucitati prije ove funkcije 
             
        }, 500);
          
         
            i++; // Sljedeca loptica
          
          
          // Čekiramo je li igrač pogodio minimalan broj brojeva, u ovom slucaju 5 i onda
          // mjesto na kojem je zadnji tacan broj izasao, mnozimo sa ulogom

            if(loopedNumbers.length === gameNumbers.length && this.obtainedNumbers.length>=5){

                // Izvlacimo zadnji dobijeni broj i trazimo div kojem je dodijeljen taj broj
                // kako bi mogli pomnoziti ulog sa data-earn
                
                const arrCopy = [...this.obtainedNumbers];
                const lastNum = arrCopy.pop(); // Izvlacimo zadnji broj
        
               for (const div of ballsDivs){
                 if(div.childNodes[0].data === lastNum + ''){
                     const dataEarn = +div.getAttribute('data-earn');
                     this.setBalance = Number(inputPayment.value)*dataEarn;
                     alert(`Cestitamo, osvojili ste ${this.formatNumbers(+inputPayment.value*dataEarn)}`);
                 }
               };

              
                  
              }
              
              if (loopedNumbers.length === gameNumbers.length && this.obtainedNumbers.length<5){
                    alert(`Izgubili ste ${this.formatNumbers(+inputPayment.value)}`);
              }

              
              this.setLocalStorage();
          
        
            // Ako su svi brojevi prikazani, prekini funkciju. Stavit pod timeout.
                if(i===gameNumbers.length){         
                     backBtn.addEventListener('click', this._newGame.bind(this));
                     clearInterval(intFun);
                 } 

            

        };
        
        const intFun = setInterval(kolo, 2000);

     
         
    
    }




   // <<<<<<<< METODA #7 >>>>>>>>

   selectBallsDiv(arr){
          // Vracamo style elementu da bude vidljiv
    infoBalls.style.transform = 'translateX(0%)';

    // Selektujemo sve divove sa klasom .ball_place unutar ovog diva
    const childEls = infoBalls.querySelectorAll('.ball_place');

    // Za svaki izabrani broj (pickedBalls) stavi childEls[index] divu taj broj

    arr.forEach(function(num, i){
       // Prvo moramo naci div od tog broja, ali moramo taj broj pretvori u string
       // vise je nacina, ja sam odabrao ovaj.

       const ball = javaScriptBalls.find(ball => ball.innerHTML === num+'');

       // Ovo radimo kako bi izvukli colorAtribute za taj broj
       // Morali smo takoder pretvoriti nodelist u obican array da bi koristili metodu

       // Kada smo nasli taj div, uzimamo njegov atribute za boju i postavljamo
       // za background childEls diva, taj atribut, a takoder i broj u taj div

       const bg = ball.getAttribute('data-bg');

       childEls[i].textContent = num;
       childEls[i].style.background = bg;
    });
   }


    // <<<<<<<< METODA #8 >>>>>>>>
    // Za objašnje metode ctrl + f, u polje upišite metoda.#brojMetode

    generateNum(arr){
        let numbers = [];
        //let thisNums = this.allNumbers;
        
        const generate = () => {
            const randomNum = Math.trunc(Math.random()*(this.allNumbers.length))+1;
            if(numbers.length < arr.length) {
                if(!numbers.includes(randomNum)){
                    numbers.push(randomNum);
                }
            } else {
                clearInterval(loopRand);
            }
        }
    
        const loopRand = setInterval(generate, 1);
    
        return numbers;
    }



         
        // <<<<<<<< METODA #9 >>>>>>>>
        // Za objašnje metode ctrl + f, u polje upišite metoda.#brojMetode

       markCorrectNum(num){
        const childEls = infoBalls.querySelectorAll('.ball_place');


        childEls.forEach(div=>{
            if(div.innerHTML===num+''){
                div.style.marginRight = '14px';
                div.style.transform = 'scale(1.060)';
                div.style.border = '4px solid  #47d147';
               
            }
        });
       }




         // <<<<<<<< METODA #10 >>>>>>>>
         // Za objašnje metode ctrl + f, u polje upišite metoda.#brojMetode

             pickBallBtn(imeKlase){
                this.unStyleBalls();
                this._ukupno = 0;
                this.pickedBalls = [];
            
               document.querySelectorAll(`${imeKlase}`).forEach( ball =>{
                   this._ukupno++; 
                   this.pickedBalls.push(+ball.innerHTML);
                   ball.style.opacity='0.5';
               });
            
               this.selectBallsDiv(this.pickedBalls);
               this.startBtnFunctionality();
            
               setTimeout(() => {
                alert('Sada mozete zapoceti igru');
            }, 100);
             }

             
            // <<<<<<<< METODA #12 >>>>>>>>
            // Metoda koja nas obavjestava koliko imamo para ili pogodenih loptica u cijeloj karijeri igranja

            infoPopup(e){
                const data = e.target.getAttribute('data-section');
                if(!data) return; //Zbog jednog nav linka koji nema funkciju kao ovi ispod.
        
                popSec.forEach(sec => sec.classList.add('popHidden'));
              
        
                const sec = document.querySelector(`.${data}`);
        
                if(sec.classList.contains('money__section')){
                    balanceText.innerHTML =this.formatNumbers(this.getBalance);
                }
              
                // Reset se moze pokrenuti samo kada je balance 0.50 ili manje

                  if(sec.classList.contains('reset__section') && this.#balance<=0.50){
                        resetText.textContent='Uspjesno resetovan balance';
                        this.resetBalance();
                    } else if(sec.classList.contains('reset__section') && this.#balance>=0.50) {
                        resetText.textContent='Ovu funkciju mozete pokrenuti tek kada budete imali manje od 0.50EUR';
                    };



                    sec.classList.remove('popHidden');

                    setTimeout(() => {
                        sec.classList.add('popHidden');
                    }, 4000);
                        
            }
            
             // <<<<<<<< METODA #13 >>>>>>>>
             // Reset svega za novu igru (osim balance i score);
            _newGame(){
                introSection.classList.remove('hidden');
                loopSection.classList.add('hidden');
                this.pickedBalls = [];
                this._ukupno = 0;
                inputPayment.value = '';
                infoBalls.style.transform = 'translateX(200%)';
                ballPlace.forEach(div=>{
                    div.textContent = '';
                    div.style.background = 'none';
                    div.style.border = 'none';
                    div.style.transform = 'none';
                    div.style.marginRight = 'none';
                 });

                     ballsDivs.forEach(ball => {
                      ball.classList.remove('addPseudo');
                      ball.innerHTML = '';
                      ball.style.background = 'none';
                      ball.classList.remove('removePseudo');
                  });
                  displayBall.innerHTML ='';
                  displayBall.classList.add('hidden');
                  displayBall.style.background = 'none';

            }



            // <<<<<<<< METODA #14 >>>>>>>>


            unStyleBalls(){
                balls.forEach(ball=>{
                    ball.style.opacity='1';
                });
             }


            // <<<<<<<< METODA #15 >>>>>>>>

             formatNumbers(value){
                return new Intl.NumberFormat(this.locale, {
                    style:'currency',
                    currency: 'EUR',
                  }).format(value);
            }



            // LOCAL STORAGE // DATA SAVE

            //set
            setLocalStorage(){
                localStorage.setItem('balance', this.#balance);
                localStorage.setItem('score', this._scoreOfCarrer);
            }
          
            //get
            getLocaleStorage(){
                const getDataBalance = localStorage.getItem('balance');
                const getDataScore = localStorage.getItem('score');

                    this.#balance = Number(getDataBalance) || 100;
            
               
         

            }

            //delete
            resetBalance(){
               this.#balance = 100;
            }

}



let app = [];


submitName.addEventListener('click', function(e){
    e.preventDefault();
if(nameInput.value){
    const name = nameInput.value;
    const acc = new Application(name);
    app.push(acc);
}
});




/////////////////////////////////////
/////// O B J A Š N J E N J E ///////
/////////////////////////////////////

/* --metoda.#1
 Metoda koja ce automatski za svaki html div (ball), izvuci broj iz njega i staviti u allNumbers.
 Sto znaci, ako bi nesto azurirali unutar htmla, automatski ce se azurirati i nacin igre u js
 */


/* --metoda.#2
  Metoda koja ce uneseno ime objekta ispraviti, u slucaju da je neispravno napisano (velika, mala slova, razmaci itd). Također, to uneseno ime postavlja u html gdje treba, kao npr klasa .name i brise
  hidden klase sekcijama koje su potrebne za dalji rad.
*/

/* --metoda.#8
 Metoda koja nam pravi unikatan array sa odredenom duzinom (length), kao parametar ubacujemo
 array ciji length zelimo
*/

/* --metoda.#9
 Metoda koja se pokrece kada pogodimo neki broj, kao parametar prima broj i trazi div u kojem se nalazi taj broj zatim mu stavlja style (u ovom slucaju border green itd) sto ce igracu dati do znanja
 da je to broj koji je tacan, odnosno kojeg je kolo izbacilo
*/

/* --metoda.#10
 Metoda koju pokrece button od nekih odredenih loptica, npr crvenih. Ako stisnemo redBtn on ce 
 oznaciti sve crvene loptice, staviti ih u pickedArray i pripremiti sve za pocetak igre.
 To radimo da ne bi manuelno morali oznaciti sve loptice sa istom bojom, ako bi zeljeli to..
*/