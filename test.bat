@ECHO OFF
SETLOCAL EnableDelayedExpansion

break>.env.development

set /p appName= Enter Application Name:
echo %appName%

@echo REACT_APP_NAME = %appName%> .env.development

call yarn start

(for /f "delims=" %%a in (.env.development) do set var=%%a
echo %var%


set /p appName= Enter Application Name:
echo %appName%
type .env.development
set /p Build=<.env.development
echo %Build%
