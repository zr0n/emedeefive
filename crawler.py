import requests
import re
import hashlib

r = requests.session()

url = "http://docker.hackthebox.eu:37313"

req = r.get(url)

reg = re.search("<h3 align='center'>(.*)</h3>", req.text)

print(reg[1])
md5 = hashlib.md5(str(reg[1]).encode('utf-8')).hexdigest()
print(md5)

postData = {'hash': md5}

x = r.post(url, data = postData)

print(x.text)