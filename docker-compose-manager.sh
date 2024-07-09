#!/bin/bash

# このシェルスクリプトは、DockerComposeを使用してコンテナを管理します。
# スクリプトはどのディレクトリからでも実行可能です。

readonly SCRIPT_DIRECTORY=$(dirname "$(readlink -f "$0")")
readonly DOCKER_COMPOSE_FILENAME="docker-compose.yml"

# docker-compose.yml ファイルが存在するかを確認します。
if [ ! -f "$SCRIPT_DIRECTORY/$DOCKER_COMPOSE_FILENAME" ]; then
    echo "$DOCKER_COMPOSE_FILENAME が見つかりません。" >&2
    exit 1
fi

case "$1" in
    start)
        # 「docker-compose up」を実行してコンテナをバックグラウンドで起動します。
        docker-compose -f "$SCRIPT_DIRECTORY/$DOCKER_COMPOSE_FILENAME" up -d || {
            echo "docker-compose up に失敗しました。" >&2
            exit 1
        }
        ;;
    stop)
        # 「docker-compose down」を実行してコンテナを停止します。
        docker-compose -f "$SCRIPT_DIRECTORY/$DOCKER_COMPOSE_FILENAME" down || {
            echo "docker-compose down に失敗しました。" >&2
            exit 1
        }
        ;;
    restart)
        # コンテナを再起動します。
        docker-compose -f "$SCRIPT_DIRECTORY/$DOCKER_COMPOSE_FILENAME" down || {
            echo "docker-compose down に失敗しました。" >&2
            exit 1
        }
        docker-compose -f "$SCRIPT_DIRECTORY/$DOCKER_COMPOSE_FILENAME" up -d || {
            echo "docker-compose up に失敗しました。" >&2
            exit 1
        }
        ;;
    status)
        # コンテナの状態を表示します。
        docker-compose -f "$SCRIPT_DIRECTORY/$DOCKER_COMPOSE_FILENAME" ps
        ;;
    debug)
        # 「docker-compose up」を実行してコンテナをフォアグラウンドで起動します。
        docker-compose -f "$SCRIPT_DIRECTORY/$DOCKER_COMPOSE_FILENAME" up || {
            echo "docker-compose up に失敗しました。" >&2
            exit 1
        }
        ;;
    *)
        echo "使用方法: $0 {start|stop|restart|status|debug}" >&2
        exit 1
        ;;
esac