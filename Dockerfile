FROM mcr.microsoft.com/dotnet/sdk:5.0


LABEL maintainer="seba gomez <@sebagomez>"

RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt update && \
    apt-get install -y nodejs && \
    npm install -g @angular/cli
