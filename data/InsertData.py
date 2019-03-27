#!/usr/bin/python
# -*- coding: utf-8 -*-
import json
import requests
import os


# Common Variables
rest_api_base = 'http://10.120.176.208:1337/'
img_folder = os.getcwd() + '/reactpics/'
app_id = 'myAppId'
headers = {'Content-Type': 'application/json', 'X-Parse-Application-Id': app_id}
headers_imgs = {'X-Parse-Application-Id': app_id}


# Insert object with file
def insertObjectWithFile(data_json, name_class, images_name):
    # Insert image
    image_api_url = '{0}mbaas/files/{1}'.format(rest_api_base, images_name)
    image_file = open(img_folder + images_name, 'rb').read()
    image_response = requests.post(image_api_url, headers=headers_imgs, data=image_file)
    if image_response.status_code == 201:

        # Prepare image data
        image_response_json = json.loads(image_response.content.decode('utf-8'))
        image_response_json['__type'] = "File"
        data_json['photo'] = image_response_json

        return insertObject(data_json, name_class)

    else:
        return 'Insert image failed: {0}'.format(image_response.status_code)


# Insert object
def insertObject(data_json, name_class):
    # Insert object
    api_url = '{0}mbaas/classes/{1}'.format(rest_api_base, name_class)
    response = requests.post(api_url, headers=headers, json=data_json)
    if response.status_code == 201:
        return json.loads(response.content.decode('utf-8'))
    else:
        return 'Insert object failed: {0}'.format(response.status_code)



# Get objects
def getObjects():
    api_url = '{0}mbaas/classes/{1}'.format(rest_api_base, name_class)
    response = requests.get(api_url, headers=headers)
    if response.status_code == 200:
        return json.loads(response.content.decode('utf-8'))
    else:
        return response.status_code


# Execute function
print(insertObjectWithFile({"name": "CHICKEN WHOPPER","description": "One bite of this flavourful burger, starring a flame-grilled, juicy 100%* chicken patty, will make you go mmmmm.Our advice: hold it with both hands to eat it.\nBK® Recommends: Go double for twice the fun.","price": "$6"}, 'Burgers', 'ChickenWhopper-Detail_1.png'))
print(insertObjectWithFile({"name": "SALSA WHOPPER® CHICKEN","description": "It is served in a freshly-toasted 5” sesame seed bun, complemented perfectly with tangy pickles, fresh tomatoes, lettuce and onions, laced with mayonnaise & ketchup.","price": "$8"}, 'Burgers', 'Salsa-Whopper-Chicken.png'))
print(insertObjectWithFile({"name": "CHICKEN TANDOOR GRILL","description": "A juicy whole, boneless chicken leg marinated in our spices and flame-grilled in our broiler, layered with tangy mint mayonnaise and onions, served in premium corn-dust buns. A delightful fusion of India’s fine culinary traditions, and BURGER KING® flame grilled heritage, this is our tribute to the taste that makes India famous all over the globe.","price": "$10"}, 'Burgers', 'new-tandoori-chicken-500X540.png'))
print(insertObjectWithFile({"name": "CHICKEN CHILLI CHEESE","description": "Bite into the crispy chicken burger and enjoy the sensation of the delectable creamy cheese in your mouth. The cheese & chicken indulgence is complemented with red chilli flakes, pickled cucumber, and our flavourful tomato-herb mayo for a little extra punch, served in our oven-fresh 4-inch sesame seed bun.","price": "$7"}, 'Burgers', 'CHICKEN-CHILLI-BURGER-500X540_6.png'))
print(insertObjectWithFile({"name": "BK® GRILL CHICKEN","description": "Our heritage of flame grilling is what makes this classic grilled chicken burger stand apart. Look out for the signature BURGER KING® grill marks. A pure and wholesome chicken patty is complemented by a tangy mint mayo and onions. The flavours will remind you of an Indian classic loved by everyone.","price": "$9"}, 'Burgers', 'BKGrillChicken-Detail_0.png'))
print(insertObjectWithFile({"name": "CRISPY CHICKEN","description": "A spicy crisp fried patty made of wholesome chicken, topped with sliced onions, with creamy mayonnaise and angry sauce, served in a 4-inch sesame seed bun. BURGER KING® delivers unmatched quality at great value.","price": "$7"}, 'Burgers', 'detail_originalImage_Crispy_Chicken.png'))

print(insertObjectWithFile({ "name": "CAPPUCCINO", "description": "100% Pure Coffee.","price": "$3"}, 'Beverages', 'cappuccino.png'))
print(insertObjectWithFile({"name": "LATTE","description": "100% Pure Coffee.","price": "$2"}, 'Beverages', 'latte.png'))
print(insertObjectWithFile({"name": "AMERICANO","description": "Americano","price": "$4"}, 'Beverages', 'Americano.png'))

print(insertObjectWithFile({}, 'Offers', 'Salsa-whopper-_LTO_website-1000x550-px-18th-august-01.png'))
print(insertObjectWithFile({}, 'Offers', 'BK-Quenches_1000-x-550_Artboard-1.png'))
print(insertObjectWithFile({}, 'Offers', '03224-1-2for10-Desktop-1080x450_CR.png'))
print(insertObjectWithFile({}, 'Offers', '03224-1-2for6-Desktop-1080x450_CR_0.png'))
print(insertObjectWithFile({}, 'Offers', '03156-4-ChickenFries_Desktop-Image-1080x450_CR.png'))
print(insertObjectWithFile({}, 'Offers', '03156-3-169Nugs_Desktop_1080x450_CR.png'))





