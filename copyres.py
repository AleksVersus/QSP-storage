import sys
import os
import shutil

resources = [
	{
		"src": "..\\[QSPGamesAll]\\2015\\2015.03.19.Секретный проект - Часть первая\\+res",
		"dst": ".\\game\\secretproject\\+res"
	},
	{
		"src": "..\\[QSPGamesAll]\\2011\\2011.04.09.Пароль от спасения\\+res",
		"dst": ".\\game\\savepass\\+res"
	},
	{
		"src": "..\\[QSPGamesAll]\\2015\\2015.03.19.Баллада о Герое\\+res",
		"dst": ".\\game\\heroballad\\+res"
	},
	{
		"src": "..\\[QSPGamesAll]\\2008\\2008.07.11.Go Home\\+res",
		"dst": ".\\game\\go_home\\+res"
	}
]

for path in resources:
	src = os.path.abspath(path["src"])
	dst = os.path.abspath(path["dst"])
	if not os.path.isdir(dst):
		print([src, dst])
		shutil.copytree(src, dst)