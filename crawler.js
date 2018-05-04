var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var products = ['Alamo/Fricon, LP FCDC5SG Display Case, Dipping Ice Cream',
'Alamo/Fricon, LP FCDC6SG Display Case, Dipping Ice Cream',
'Alamo/Fricon, LP FCDC7SG Display Case, Dipping Ice Cream',
'Alamo/Fricon, LP FDDC7SG Display Case, Dipping Ice Cream',
'Alamo/Fricon, LP FDDC9SG Display Case, Dipping Ice Cream',
'Alamo/Fricon, LP SCQ18D Chest Freezer',
'Alamo/Fricon, LP XAUC12R-HC Refrigerator, Undercounter, Reach-In',
'Alamo/Fricon, LP XJBC25-HC Bottle Cooler',
'Alamo/Fricon, LP XPICL1-HC Refrigerated Counter, Pizza Prep Table',
'Alamo/Fricon, LP XPICL2-HC Refrigerated Counter, Pizza Prep Table',
'Alamo/Fricon, LP XPICL3-HC Refrigerated Counter, Pizza Prep Table',
'Alamo/Fricon, LP XSCL2-36-E-HC Refrigerated Counter, Sandwich / Salad',
'All About Furniture BWB-D36 Booth',
'APW Wyott CTRD-1014 Dispenser, Tray Rack',
'APW Wyott CTRD-1620 Dispenser, Tray Rack',
'APW Wyott GGM-48I-CE Griddle, Gas, Countertop',
'Beverage Air BB48HC-1-GS-F-PT-B-27 Back Bar Cabinet, Refrigerated',
'Beverage Air BB48HC-1-GS-F-PT-S-27 Back Bar Cabinet, Refrigerated',
'Beverage Air BB72HC-1-GS-F-PT-B-27 Back Bar Cabinet, Refrigerated',
'Beverage Air BB72HC-1-GS-F-PT-S-27 Back Bar Cabinet, Refrigerated',
'Beverage Air FB49-1HS Freezer, Reach-In',
'Beverage Air HBF23-1-HG Freezer, Reach-In',
'Beverage Air HBF27-1-G Freezer, Reach-In',
'Beverage Air HBR23HC-1-HG Refrigerator, Reach-In',
'Beverage Air HBR23HC-1-HS Refrigerator, Reach-In',
'Beverage Air HBR23HC-1-WINE Refrigerator, Wine, Reach-In',
'Beverage Air HBR27-1-G-LED-WINE Refrigerator, Wine, Reach-In',
'Beverage Air HBR27HC-1-G-WINE Refrigerator, Wine, Reach-In',
'Beverage Air HBR27HC-1-HG Refrigerator, Reach-In',
'Beverage Air HBR27HC-1-HS Refrigerator, Reach-In',
'Beverage Air HBR27HC-1-WINE Refrigerator, Wine, Reach-In',
'Beverage Air HBR44HC-1-HS Refrigerator, Reach-In',
'Beverage Air HBR49HC-1-G-WINE Refrigerator, Wine, Reach-In',
'Beverage Air HBR72HC-1-HG Refrigerator, Reach-In',
'Beverage Air HBRF49-1-G Refrigerator Freezer, Reach-In',
'Beverage Air HBRF72-1 Refrigerator Freezer, Reach-In',
'Beverage Air HF2-1HG Freezer, Reach-In',
'Beverage Air HRP2-1G Refrigerator, Reach-In',
'Beverage Air HRPS1HC-1G Refrigerator, Reach-In',
'Beverage Air MMF44-1-W-LED Freezer, Merchandiser',
'Beverage Air MMR49HC-1-SS-WINE Refrigerator, Wine, Reach-In',
'Beverage Air MMRF72-1-B-LED Refrigerator Freezer, Reach-In',
'Beverage Air MMRR49-1-SS-LED-WINE Refrigerator, Wine, Reach-In',
'Beverage Air PFI2-5AS Freezer, Roll-In',
'Beverage Air PRD3-1AHS Refrigerator, Pass-Thru',
'Beverage Air PRT1-1AS Refrigerator, Roll-Thru',
'Beverage Air PRT2-1AS Refrigerator, Roll-Thru',
'Beverage Air RI18HC-HS Refrigerator, Reach-In',
'Beverage Air RRP60 Refrigerated Counter, Pizza Prep Table',
'Beverage Air SMF49HC-1-W-02 Milk Cooler / Station',
'Beverage Air SPE27HC-C Refrigerated Counter, Sandwich / Salad Top',
'Beverage Air SPED36HC-08C-2 Refrigerated Counter, Sandwich / Salad Top',
'Beverage Air WBC110R Blast Chiller, Reach-In',
'Beverage Air WBC60 Blast Chiller, Undercounter',
'Beverage Air WBC75 Blast Chiller, Reach-In',
'Beverage Air WTR41HC Refrigerated Counter, Work Top',
'Beverage Air WTR48A-R134 Refrigerated Counter, Work Top',
'Chase Doors SC 3018 36X84 Door, Kitchen Traffic',
'Chase Doors SC 5028 48X84 Door, Kitchen Traffic',
'Chase Doors SD 2013 42X84 Door, Kitchen Traffic',
'Chase Doors SD 2013 42X90 Door, Kitchen Traffic',
'Chase Doors SD 2013D 60X96 Door, Kitchen Traffic',
'Chase Doors SD 2020 40X84 Door, Kitchen Traffic',
'Chase Doors SD 2020D 56X90 Door, Kitchen Traffic',
'CMA Dishmachines 20411.00 Pre-Rinse Faucet Assembly',
'Comstock-Castle FHP24-1LB Charbroiler / Hotplate, Gas, Countertop',
'Comstock-Castle FHP36-2RB Charbroiler / Hotplate, Gas, Countertop',
'Comstock-Castle FHP48-3LB Charbroiler / Hotplate, Gas, Countertop',
'Comstock-Castle FHP48-3RB Charbroiler / Hotplate, Gas, Countertop',
'Federal Industries EH-3628SSD Display Case, Hot Food, Countertop',
'Flash Furniture 24\'\'\ x 30\'\'\ Rectangular Two-Tone Resin Cherry and',
'Hoshizaki HS-2160 Ice Bin Top',
'Howard-McCray CHS40-4 Display Case, Heated Deli, Floor Model',
'Howard-McCray CHS40-4-BE Display Case, Heated Deli, Floor Model',
'Howard-McCray GF102BM-FF-B Freezer, Merchandiser',
'Howard-McCray GF65BM-S-LT Freezer, Merchandiser',
'Howard-McCray GR22-B Refrigerator, Merchandiser',
'Howard-McCray GR75-B Refrigerator, Merchandiser',
'Howard-McCray GR88BM-B Refrigerator, Merchandiser',
'Howard-McCray GSR48BM Refrigerator, Merchandiser',
'Howard-McCray GSR75 Refrigerator, Merchandiser',
'Howard-McCray R-CFS40E-4 Display Case, Deli Seafood / Poultry',
'Howard-McCray R-CMS34E-4 Display Case, Red Meat Deli',
'Howard-McCray RIF4-24-LED-S Freezer, Merchandiser',
'Howard-McCray RIF4-30-S Freezer, Merchandiser',
'Howard-McCray RIF5-24-LED-S Freezer, Merchandiser',
'Howard-McCray RIN2-24-LED-S Refrigerator, Merchandiser',
'Howard-McCray RIN2-30-S Refrigerator, Merchandiser',
'Howard-McCray RIN3-30-B Refrigerator, Merchandiser',
'Howard-McCray RIN3-30-LED Refrigerator, Merchandiser',
'Howard-McCray RIN3-30-S Refrigerator, Merchandiser',
'Howard-McCray R-OD30E-4L-S-LED Merchandiser, Open',
'Howard-McCray R-OD30E-4-S-LED Merchandiser, Open',
'Howard-McCray R-OD35E-4S-LS Merchandiser, Open',
'Howard-McCray R-OD35E-8S-S-LS Merchandiser, Open',
'Howard-McCray R-OM30E-3L-S-LED Merchandiser, Open',
'Howard-McCray R-OM30E-3-S-LED Merchandiser, Open',
'Howard-McCray R-OM35E-3L-LED Merchandiser, Open',
'Howard-McCray R-OM35E-4L-S-LED Merchandiser, Open',
'Howard-McCray R-OP30E-5L-LS Display Case, Produce',
'Howard-McCray R-OP30E-5-LS Display Case, Produce',
'Howard-McCray R-OS30E-5 Merchandiser, Open',
'Howard-McCray R-OS35E-5-S Merchandiser, Open',
'Howard-McCray R-SR75 Refrigerator, Reach-In',
'Howard-McCray SC-CFS40E-12-BE Display Case, Deli Seafood / Poultry',
'Magikitch\'\n FM-SMB-636 Charbroiler, Gas, Floor Model',
'MasterBilt MNR242SSG/0 Refrigerator, Reach-In',
'MasterBilt MPW252SSG/0 Heated Cabinet, Pass-Thru',
'Moffat EC40D10 Combi Oven, Electric',
'Moffat EC40D10/2 Combi Oven, Electric',
'MVP Group F-14 Glasswasher',
'MVP Group KFM-CG-80-R Display Case, Red Meat Deli',
'MVP Group KFM-OF-40-S Display Case, Refrigerated Deli',
'MVP Group KFM-SC-100-R Display Case, Deli Seafood / Poultry',
'MVP Group KPM-CG-60-R Display Case, Refrigerated Deli',
'MVP Group KPM-OF-100-S Display Case, Refrigerated Deli',
'MVP Group KPM-OF-60-S Display Case, Refrigerated Deli',
'MVP Group KPM-OF-80-S Display Case, Refrigerated Deli',
'Salvajor ARSS Disposer Control Panel',
'Salvajor ARSS-LD Disposer Control Panel',
'Salvajor AS8460 Disposer Accessories',
'Serv-Ware T3072CWP-16BS Work Table, 63 - 72 , Stainless Steel Top',
'Summit Commercial FS408BLBI7SSTB Freezer, Undercounter, Reach-In'];

console.log(`=======================================================================================================`);
for (let i = 0; i < products.length; i++){
    var productTitle = products[i];
    var pageToVisit = "https://www.cdrestaurantequipment.com/catalogsearch/result/?cat=0&q=" + productTitle;
//    console.log("Visiting page " + pageToVisit);
        request(pageToVisit, function(error, response, body){          

                        if(error || undefined) {
                            //setTimeout(console.log("Status code: " + response.statusCode), 60000);
                            console.log("Error: " + error);
                        }
                        if(response.statusCode == undefined) {
                            //setTimeout(console.log("Status code: " + response.statusCode), 60000);
                            console.log("Error: " + error);
                        }
                        if(response.statusCode === 200) {
                            
                            var $ = cheerio.load(body);
                            var productPrice = $('#products-grid li:first-child div.special-price h3.price.mar-0').text();
                            
                            console.log(` ${products[i]}  :   ${productPrice.replace(/\s+/g, '')}
                            
                            `);
                        }
                    }
    );
}

