-Gönderilecek Veri
`javascript
Rez_Id          as Id  //ekranda olmayacak
	  Rez_Master_id   as Masterid  //ekranda olmayacak
	  Kimlik_Id       as Kimlikid  /ekranda olmayacak
	  Case When Rez_Online_10  = 1 then 'CHECKIN' else 'WAIT' end as Durum
	  Rez_Blokaj      as Odano 
	  Rez_Adi_1       as Adi 
	  Rez_Adi_2       as Soyadi
	  Kimlik_Ana      as Anaadi
	  Kimlik_Baba     as Babaadi
	  isnull(Rez_Dogum_tarihi,Kimlik_Dogum)    as Dogumtarihi
	  Kimlik_Cinsiyet as Cinsiyet 
	  Kimlik_Tel      as Telefon  
	  Kimlik_Mail     as Mail
	  Kimlik_No       as BelgeNo 
	  Kimlik_Tc       as Tcno 
	  Kimlik_Uyruk    as Uyruk  //Dropdown reşat beyden gelecek
	  Kimlik_Turu     as Belgeturu //Dropdown reşat beyden gelecek
	  Kimlik_Medeni   as Medenidurum  //Dropdown reşat beyden gelecek
      `
