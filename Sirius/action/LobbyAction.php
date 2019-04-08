<?php

	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}

	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_MEMBER);
		}

		protected function executeAction() {
			$data = [];
			$data["key"] = $_SESSION["key"];
			if (empty($_SESSION["availableGames"])) {
				$_SESSION["availableGames"] = $this->callAPI("list", $data);
			}
		}

	}
