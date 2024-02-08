import requests
import json

s = requests.Session()



cookies = {
    '_ga_8Q63TH4CSL': 'GS1.1.1706898916.6.1.1706901068.60.0.0',
    '_ga': 'GA1.1.431134358.1698746806',
    '__stripe_mid': 'b5420b67-1d05-4c2f-948e-10bb19efcd027fd86a',
    'token': 'KdwevoiHRuhyWxLRoeFiXioZrdvGrXxgyeUxOlXNCXHtBlPcTGhscFVzOaREXNxLqdyFsaoLPKEoutfKIjibrENoyCVLWveZEzBJFcTDexyRDCkwCqTIMfGSnTQjBdjx',
    'hf-chat': '2b30692f-4896-409d-8615-f30aa39a40c4',
    '_ga_R4JMGZWPD9': 'GS1.1.1699039238.2.0.1699039238.0.0.0',
    '__stripe_sid': 'eb344d18-f7a2-4ab6-8fc2-c1fbfb4d697034f456',
    'aws-waf-token': '2e1a6f89-75da-40fe-a205-243fe8ad527a:CQoAdeWFYa1dAQAA:cWEWeb8wj4ZLGvSa0THM/5h5AzPPT7ualXb5ZxCMBIGhzJOKZXpGkeW+JqUMIvsU0DlhS3DdHCB7IpeqqTrYTfup4jtfm0I48l1uX69O52GG4uqZGRWIzevTetMZH/BohKhxDy/s52sYUK0nUMok+ZOH0yViBFlompHwKVE2pjqPBBT4NHrKO42JOq+1DZvkI1hX2IojpvMxeNC48kgcn5UUhGb6gTc+EPMaDDswHw4y269yTQ==',
}

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/120.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    # 'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://huggingface.co/chat/conversation/65bd35f7aa3018be82b194aa',
    'Content-Type': 'application/json',
    'Origin': 'https://huggingface.co',
    'Connection': 'keep-alive',
    # 'Cookie': '_ga_8Q63TH4CSL=GS1.1.1706898916.6.0.1706898916.60.0.0; _ga=GA1.1.431134358.1698746806; __stripe_mid=b5420b67-1d05-4c2f-948e-10bb19efcd027fd86a; token=xXzaJaXbNZUmLEvJmGmcOSMkyyqTYXsdBSUWUrzuhJXvpHQZRViZedSDNBcdYuMHOzgfFtIeErSDKTqfeyrDdOzwvrWKbXgpYUeENULzoAmJpOsanOrlwmSEIjnzOofq; hf-chat=6546edde-f358-4ae9-9eb7-fe5e2472fdab; _ga_R4JMGZWPD9=GS1.1.1699039238.2.0.1699039238.0.0.0',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    # Requests doesn't support trailers
    # 'TE': 'trailers',
}

promt = input("Enter the prompt: ")

json_data = {
    'inputs': f'{promt}',
    'id': 'e20f3c74-114b-4223-92ed-3b70662be4c5',
    'is_retry': False,
    'is_continue': False,
    'web_search': True,
    'files': [],
}

# response = requests.post(
#     'https://huggingface.co/chat/conversation/65bd35f7aa3018be82b194aa',
#     cookies=cookies,
#     headers=headers,
#     json=json_data,
# )

text = ""

with s.post('https://huggingface.co/chat/conversation/65bd35f7aa3018be82b194aa', cookies=cookies, json=json_data, headers=headers, stream=True) as resp:
        for line in resp.iter_lines():
            if line:
                if line != b'':
                    try:
                        line = json.loads(line.decode("utf-8"))
                        if line['type'] == 'stream':
                            print(line['token'])
                            text += line['token']
                    except json.JSONDecodeError:
                        pass
                    
print(text)
