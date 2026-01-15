let button = document.getElementById('button');
let dlt_btn = document.getElementById('del')
let nav_links = document.querySelector('.nav-links');
let menu_icon = document.querySelector('.icon-menu');

menu_icon.addEventListener('click', () => {
  nav_links.style = "transform: translateX(0);"
})

document.addEventListener('click,', (e) => {
  if (!e.target.closest('.nav')) {
    nav_links.style = "transform: translateX(100%);"
  }
});

dlt_btn.addEventListener('click', () => {
  document.querySelector('.form-control').value = "";
})

document.addEventListener('scroll', () => {
  nav_links.style = "transform: translateX(100%);"
})

document.querySelector('.close-btn').addEventListener('click', () => {
  nav_links.style = "transform: translateX(100%);"
})

button.addEventListener('click', function () {

  nb = document.getElementById('nombre').value;

  if (nb) {
    let nb_uniter = ['', 'un ', 'deux ', 'trois ', 'quatre ', 'cinq ', 'six ', 'sept', 'huit', 'neuf'];

    let nb_dizaine = ['dix ', 'onze ', 'douze ', 'trieze ', 'qatorze ', 'quinze ', 'sieze ', 'dix-sept ', 'dix huit ', 'dix-neuf '];

    let nb_dizaine2 = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante', 'quatre-vingt', 'quatre-vingt'];

    let nb_centaine = ['', 'cent', 'deux Cent ', 'trois cent', 'quatre cent', 'cinq cent', 'six cent', 'sept cent', 'huit cent', 'neuf cent'];

    let aux;
    let p_ecrit_en_ch;
    let p_ecrit_en_l;
    let nb_fin = [, , ,];

    function decomposition_total() {

      let u = (nb % 10);
      let d = (nb % 100) - u;
      let c = (nb % 1000) - d - u;
      let m = (nb % 1000000) - c - d - u;
      let million = (nb % 1000000000) - m - c - d - u;
      let milliard = (nb % 1000000000000000000) - million - m - c - d - u;

      let aux_u = u;
      let aux_d = d / 10;
      let aux_c = c / 100;
      let aux_m = m / 1000;
      let aux_million = million / 1000000;
      let aux_milliard = milliard / 1000000000;

      let nb_c_trg = aux_c + '' + aux_d + '' + aux_u;
      let tab_t = [aux_milliard, aux_million, aux_m, nb_c_trg];
      return tab_t;
    }




    function decomposition_partiel(nb9) {
      let up = nb9 % 10;
      let dp = (nb9 % 100) - up;
      let cp = (nb9 % 1000) - dp - up;

      let aux_up = up;
      let aux_dp = dp / 10;
      let aux_cp = cp / 100;

      let tab_p = [aux_cp, aux_dp, aux_up];

      return tab_p;
    }
    function lire_p(aux7) {

      let uniter;
      let dizaine;
      let centaine;
      let aux1;
      aux1 = aux7;

      if (aux1[0] == 0 && aux1[1] == 0) { if (aux1[2] == 0) { uniter = ' '; } else { uniter = nb_uniter[aux1[2]]; } }

      if (aux1[1] == 7 || aux1[1] == 9) {

        dizaine = nb_dizaine2[aux1[1]];
        uniter = nb_dizaine[aux1[2]];
      }
      else {
        if (aux1[1] != 1) {
          dizaine = nb_dizaine2[aux1[1]];
          uniter = nb_uniter[aux1[2]];
        }
        else {
          dizaine = nb_dizaine[aux1[2]];
          uniter = '';
        }
      }
      if (aux1[0]) {
        centaine = nb_centaine[aux1[0]];
      }
      let result_p = [centaine, dizaine, uniter];
      let result_p1 = result_p.join(' ');
      return result_p1;
    }

    aux = decomposition_total(nb);

    if (aux[0] != 0) {
      p_ecrit_en_ch = decomposition_partiel(aux[0]);
      p_ecret_en_l = lire_p(p_ecrit_en_ch);
      nb_fin[0] = p_ecrit_en_l + 'milliard';
    }

    if (aux[1] != 0) {
      p_ecrit_en_ch = decomposition_partiel(aux[1]);
      p_ecrit_en_l = lire_p(p_ecrit_en_ch);
      nb_fin[1] = p_ecrit_en_l + 'million';
    }

    if (aux[2] != 0) {
      p_ecrit_en_ch = decomposition_partiel(aux[2]);
      p_ecrit_en_l = lire_p(p_ecrit_en_ch);
      nb_fin[2] = p_ecrit_en_l + 'mille';
    }

    if (aux[3] != 0) {
      p_ecrit_en_ch = decomposition_partiel(aux[3]);
      p_ecrit_en_l = lire_p(p_ecrit_en_ch);
      nb_fin[3] = p_ecrit_en_l;
    }

    let nombre_lettre = nb_fin.join(' ');
    let div2 = document.getElementById('div2');
    div2.style.display = 'block';
    div2.innerHTML = nombre_lettre;
  }

}, false);
